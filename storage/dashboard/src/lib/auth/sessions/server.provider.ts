import { BackendClient } from "@lib/apis/client";
import { BackendSchemas } from "@lib/apis/types";
import { JwtSecret } from "@lib/configs/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import "server-only";

export interface Session {
  user: {
    id: number;
    roles: BackendSchemas["Role"][];
  };
  accessToken: string;
  refreshToken: string;
  ts: number;
}

interface SessionReadResult {
  session: Session;
  canRefresh: boolean;
}

export class SessionProvider {
  private static instance: SessionProvider;

  private expiryDays = 7;
  private refreshRate = 0.8;
  cookieName = "session";

  private constructor() {}

  static getInstance(): SessionProvider {
    if (!SessionProvider.instance) {
      SessionProvider.instance = new SessionProvider();
    }
    return SessionProvider.instance;
  }

  get maxAge() {
    return this.expiryDays * 24 * 60 * 60 * 1000;
  }

  async create(session: Session) {
    const exp = this.toExpiryTs();
    const token = jwt.sign(session, JwtSecret, { expiresIn: exp });
    return { token, exp };
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
      ts: Date.now(),
    });
  }

  async read(cookieStore: { get: (name: string) => { value: string } | undefined }) {
    const token = cookieStore.get(this.cookieName)?.value;
    if (!token) return null;

    try {
      const payload = jwt.verify(token, JwtSecret) as Session & jwt.JwtPayload;

      let canRefresh = false;
      if (payload.exp) {
        canRefresh = (Date.now() - payload.ts) / (payload.exp - payload.ts) >= this.refreshRate;
      }

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
    cookieStore.delete(this.cookieName);
  }

  private toExpiryTs() {
    return Date.now() + this.maxAge;
  }
}
