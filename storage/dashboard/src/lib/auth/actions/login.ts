"use server";

import { BackendClient } from "@lib/apis/client";
import { ServerActionResponse, ServerPlainResponse } from "@lib/apis/response";
import { BackendSchemas } from "@lib/apis/types";
import { cookies } from "next/headers";
import { SessionProvider } from "../sessions/server.provider";

export type SignInResponse = BackendSchemas["SignInResponse"];

export async function login(
  email: string,
  password: string,
): Promise<ServerPlainResponse<SignInResponse | null>> {
  const res = await BackendClient.POST("/auth/login", {
    body: { password, username: email },
  });

  if (res.error || !res.data) {
    return new ServerActionResponse({
      error: { code: "401", message: "Login Failed" },
      data: null,
    }).toPlain();
  }

  const session = SessionProvider.getInstance();
  const sessionToken = await session.create({
    accessToken: res.data.access_token,
    refreshToken: res.data.refresh_token,
    user: {
      id: res.data.session.id,
      roles: res.data.session.roles,
    },
    ts: Date.now(),
  });

  const cookieStore = await cookies();
  cookieStore.set(session.cookieName, sessionToken.token, {
    httpOnly: true,
    secure: true,
    expires: new Date(sessionToken.exp),
    sameSite: "lax",
    path: "/",
  });

  return new ServerActionResponse<SignInResponse>({
    data: res.data,
  }).toPlain();
}
