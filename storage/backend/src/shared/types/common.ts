import { Request } from "express";
import { UserIdentifier } from "../tokens/dtos/jwt.dto";

export interface TusssRequest extends Request {
  user?: UserIdentifier;
}
