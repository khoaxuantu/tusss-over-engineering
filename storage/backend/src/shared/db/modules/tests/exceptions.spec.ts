import { InternalServerErrorException } from "@nestjs/common";
import { TestErrorMessage } from "@tusss/core";
import { DatabaseError } from "pg";
import { DbErrorAdapter, PgError, PgErrorCode } from "../exceptions";

describe(DbErrorAdapter.name, () => {
  describe("toHttpException", () => {
    it("should return controled error", () => {
      const err = new DatabaseError(TestErrorMessage, 0, "error");
      err.code = PgErrorCode.uniqueViolation;
      const res = DbErrorAdapter.toHttpException(err);
      expect(res).toBeInstanceOf(PgError[PgErrorCode.uniqueViolation].sibling);
    });

    it("should return default internal error for uncontroled error", () => {
      const err = new DatabaseError(TestErrorMessage, 0, "error");
      const res = DbErrorAdapter.toHttpException(err);
      expect(res).toBeInstanceOf(InternalServerErrorException);
    });
  });
});
