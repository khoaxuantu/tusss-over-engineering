import { CommonMessage } from "@/shared/constants";
import {
  BadRequestException,
  ConflictException,
  HttpException,
  InternalServerErrorException,
} from "@nestjs/common";
import { DatabaseError } from "pg";

interface PgErrorItem {
  msg: string;
  sibling: new (msg: string) => HttpException;
}

export enum PgErrorCode {
  uniqueViolation = "23505",
  foreignViolation = "23503",
}

export const PgError: Record<string, PgErrorItem> = {
  [PgErrorCode.uniqueViolation]: {
    msg: CommonMessage.error.duplicated,
    sibling: ConflictException,
  },
  [PgErrorCode.foreignViolation]: {
    msg: CommonMessage.error.corruptedData,
    sibling: BadRequestException,
  },
} as const;

export class DbErrorAdapter {
  static toHttpException(err: DatabaseError): HttpException {
    if (err.code) {
      const item = PgError[err.code];
      if (item) return new item.sibling(item.msg);
    }

    return new InternalServerErrorException(CommonMessage.error.db);
  }
}
