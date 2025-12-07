import { Db, DbTable } from "@/db/modules/types";
import { Pagination } from "@/shared/models/pagination.model";
import { Sort } from "@/shared/models/sort.model";
import { createMock } from "@golevelup/ts-jest";
import { SelectQueryBuilder } from "kysely";
import { PaginationHelper } from "../pagination.helper";

describe(PaginationHelper.name, () => {
  const helper = new PaginationHelper();
  const query = createMock<SelectQueryBuilder<Db, DbTable, {}>>({
    select: jest.fn().mockReturnThis(),
  });

  describe("count", () => {
    it("should return 0 when query returns null", async () => {
      query.executeTakeFirst.mockResolvedValueOnce(undefined);
      const res = await helper.count(query);
      expect(res).toEqual(0);
    });

    it("should return 2 when count is 2", async () => {
      query.executeTakeFirst.mockResolvedValueOnce({ count: 2 });
      const res = await helper.count(query);
      expect(res).toEqual(2);
    });
  });

  describe("fetch", () => {
    test("paginate & sort", async () => {
      const subject = helper.fetch(query, new Pagination(), [
        new Sort({
          direction: "asc",
          field: "name",
        }),
      ]);

      await expect(subject).resolves.not.toThrow();
    });
  });
});
