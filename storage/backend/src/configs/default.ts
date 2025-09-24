import { CommonConfig } from "./types";

export const defaultConfig: CommonConfig = {
  db: {
    name: process.env.DB_NAME ?? "tusss",
    host: process.env.DB_HOST ?? "localhost",
    user: process.env.DB_USER ?? "postgres",
    password: process.env.DB_PWD ?? "postgres",
    port: +(process.env.DB_PORT || "5432"),
  },
  auth: {
    secret: {
      default: process.env.AUTH_SECRET || "lmao",
    },
    jwt_expiry: {
      login: "1h",
      refresh: "30d",
    },
  },
};
