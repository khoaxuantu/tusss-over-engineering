import { User } from "@/users/schemas/user.schema";
import { Request } from "express";

export interface TusssRequest extends Request {
  user?: User;
}
