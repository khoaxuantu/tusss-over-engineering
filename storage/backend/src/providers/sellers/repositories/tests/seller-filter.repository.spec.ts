import { MockDbClient } from "@/shared/db/tests/shared-contexts/db";
import { MockPaginationHelper } from "@/shared/repos/helpers/tests/mocks/pagination.helper";
import { Test } from "@nestjs/testing";
import { Pagination } from "@tusss/core";
import { SellerFilterRepository } from "../seller.repository";

describe(SellerFilterRepository.name, () => {
  const db = new MockDbClient();
  const pagination = new MockPaginationHelper();

  let repository: SellerFilterRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        SellerFilterRepository,
        { provide: db.provide, useValue: db },
        { provide: pagination.cls, useValue: pagination },
      ],
    }).compile();

    repository = moduleRef.get(SellerFilterRepository);
  });

  describe("newQb", () => {
    it("should be defined", () => {
      expect(repository.newQb()).toBeDefined();
    });
  });

  describe("newEb", () => {
    it("should be defined", () => {
      expect(repository.newEb()).toBeDefined();
    });
  });

  describe("paginate", () => {
    test("execute", async () => {
      const res = await repository.paginate(repository.newQb(), new Pagination(), []);
      expect(res).toBeDefined();
    });
  });
});
