import { SessionProvider } from "@lib/auth/sessions/server.provider";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const res = NextResponse.next();

  const sessionProvider = SessionProvider.getInstance();
  const session = await sessionProvider.read(req.cookies);
  if (session?.canRefresh) {
    const refreshToken = await sessionProvider.refresh(session.session);
    if (refreshToken) {
      res.cookies.set({
        name: sessionProvider.cookie.name,
        value: refreshToken,
        maxAge: sessionProvider.cookie.maxAge,
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
      });
    }
  }

  return res;
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/login`, `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ["/((?!login|api|trpc|_next|_vercel|.*\\..*).*)"],
};
