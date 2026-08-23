import { CommonConfig } from "./types";

export const defaultConfig = (): CommonConfig => ({
  auth: {
    secret: {
      default: process.env.AUTH_SECRET || "lmao",
    },
    jwt_expiry: {
      login: "1h",
      refresh: "30d",
    },
    timer: {
      refresh_after: 45 * 60 * 1000, // 45 minutes
    },
  },
});
