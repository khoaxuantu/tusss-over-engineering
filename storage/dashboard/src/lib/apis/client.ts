/* eslint-disable react-hooks/rules-of-hooks */
import colors from "@colors/colors";
import { SessionProvider } from "@lib/auth/sessions/server.provider";
import { BackendUrl } from "@lib/shared/configs/client";
import { MonitorHelper } from "@lib/shared/helpers/monitor.helper";
import { logger } from "@lib/shared/logger/server";
import { cookies } from "next/headers";
import createClient, { Middleware } from "openapi-fetch";
import QueryString from "qs";
import "server-only";
import type { paths } from "./gen/schemas";

export const BackendClient = createClient<paths>({
  baseUrl: BackendUrl,
  querySerializer: (data) => QueryString.stringify(data),
});

const logMiddleware: Middleware = {
  onRequest: (ctx) => {
    (ctx.request as any)["timer"] = MonitorHelper.timer();

    return ctx.request;
  },
  onResponse: (ctx) => {
    const timer = (ctx.request as any)["timer"] as ReturnType<typeof MonitorHelper.timer>;
    if (timer) {
      logger.debug(
        colors.blue("[called]"),
        ctx.schemaPath,
        timer.stop(),
        ctx.params.query || "",
        ctx.params.path || "",
      );
    }
  },
};

const authMiddleware: Middleware = {
  onRequest: async (ctx) => {
    const cookieStore = await cookies();
    const sessionProvider = SessionProvider.getInstance();
    const token = await sessionProvider.read(cookieStore);

    if (!token) return undefined; // Skip when no token

    ctx.request.headers.set("Authorization", `Bearer ${token.session.accessToken}`);

    return ctx.request;
  },
};

BackendClient.use(logMiddleware, authMiddleware);
