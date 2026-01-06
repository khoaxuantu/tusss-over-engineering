import { base64url } from "jose";
import "server-only";

export const Environment = process.env.NODE_ENV || "development";
export const JweSecret = base64url.decode(
  process.env.AUTH_SECRET || "AES256Key--" + new Array(32).fill("a").join(""),
);
