import "server-only";

export const Environment = process.env.NODE_ENV || "development";
export const JwtSecret = process.env.AUTH_SECRET || "";
