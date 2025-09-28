import { Request } from "express";
import { UserIdentifier } from "../tokens/dtos/jwt.dto";

export declare type ClassConstructor<T> = {
  new (...args: any[]): T;
};

export interface TusssRequest extends Request {
  user?: UserIdentifier;
}
