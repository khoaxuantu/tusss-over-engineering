import { BackendClient } from "@lib/apis/client";
import { BackendSchemas } from "@lib/apis/types";
import { JweSecret } from "@lib/shared/configs/server";
import { DecimalPrecision } from "@lib/shared/helpers/calc.helper";
import { compareAsc } from "date-fns";
import { EncryptJWT, jwtDecrypt, JWTPayload } from "jose";
import { cookies } from "next/headers";
import "server-only";

export interface Session {
  user: {
    id: number;
    roles: BackendSchemas["Role"][];
  };
  accessToken: string;
  refreshToken: string;
  refreshAfter: Date;
}

interface SessionReadResult {
  session: Session;
  canRefresh: boolean;
}

class SessionCookieProvider {
  readonly name = "session" as const;
  readonly maxAge = 3600 * 24 * 30; // 30 days in seconds

  toExpiry(date: Date) {
    return new Date(date.getTime() + this.maxAge * 1000);
  }
}

export class SessionProvider {
  private static instance: SessionProvider;

  readonly tokenMaxAge = 3600 * 24 * 30; // seconds
  readonly cookie = new SessionCookieProvider();

  private constructor() {}

  static getInstance(): SessionProvider {
    if (!SessionProvider.instance) {
      SessionProvider.instance = new SessionProvider();
    }
    return SessionProvider.instance;
  }

  async create(session: Session & JWTPayload) {
    const token = await new EncryptJWT(session)
      .setExpirationTime(this.toExp())
      .setIssuedAt()
      .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
      .encrypt(JweSecret);
    return token;
  }

  async refresh(session: Session) {
    const res = await BackendClient.POST("/auth/token/refresh", {
      body: { refresh_token: session.refreshToken },
    });

    if (res.error || !res.data) return null;

    return this.create({
      accessToken: res.data.access_token,
      refreshToken: res.data.refresh_token,
      user: session.user,
      refreshAfter: res.data.refresh_after,
    });
  }

  async read(cookieStore: { get: (name: string) => { value: string } | undefined }) {
    const token = cookieStore.get(this.cookie.name)?.value;
    if (!token) return null;

    try {
      const decrypted = await jwtDecrypt(token, JweSecret);
      const payload = decrypted.payload as Session & JWTPayload;

      const canRefresh = compareAsc(new Date(), payload.refreshAfter) >= 0;

      return {
        canRefresh,
        session: {
          accessToken: payload.accessToken,
          refreshToken: payload.refreshToken,
          user: payload.user,
        },
      } as SessionReadResult;
    } catch {
      return null;
    }
  }

  async clean() {
    const cookieStore = await cookies();
    cookieStore.delete(this.cookie.name);
  }

  private toExp() {
    return DecimalPrecision.round((Date.now() + this.tokenMaxAge * 1000) / 1000);
  }
}
