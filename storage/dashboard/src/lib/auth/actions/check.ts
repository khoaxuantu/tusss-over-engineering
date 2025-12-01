"use server";

import { ServerActionResponse } from "@lib/apis/response";
import { cookies } from "next/headers";
import { Session, SessionProvider } from "../sessions/server.provider";

export async function getSession() {
  const cookieStore = await cookies();
  const sessionProvider = SessionProvider.getInstance();
  const res = await sessionProvider.read(cookieStore);
  if (!res) {
    return new ServerActionResponse({ data: null }).toPlain();
  }

  return new ServerActionResponse<Session["user"]>({ data: res.session.user }).toPlain();
}
