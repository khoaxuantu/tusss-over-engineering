import { SessionProvider } from "@lib/auth/sessions/provider";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const res = NextResponse.next();

  const sessionProvider = SessionProvider.getInstance();
  const session = await sessionProvider.read(req.cookies);
  if (session?.canRefresh) {
    const refreshRes = await sessionProvider.refresh(session.session);
    if (refreshRes) {
      res.cookies.set({
        name: sessionProvider.cookieName,
        value: refreshRes.token,
        maxAge: sessionProvider.maxAge,
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
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
