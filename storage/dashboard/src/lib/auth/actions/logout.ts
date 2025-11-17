"use server";

import { cookies } from "next/headers";
import { SessionProvider } from "../sessions/provider";

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SessionProvider.getInstance().cookieName);
}
