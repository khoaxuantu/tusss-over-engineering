import { MockDbClient } from "@/db/tests/shared-contexts/db";
import { Pagination } from "@/shared/models/pagination.model";
import { MockPaginationHelper } from "@/shared/repos/helpers/tests/mocks/pagination.helper";
import { Test } from "@nestjs/testing";
import { District } from "../../district.model";
import { DistrictReadRepository } from "../../district.repository";

describe(DistrictReadRepository.name, () => {
  const db = new MockDbClient();
  const pagination = new MockPaginationHelper();

  let repository: DistrictReadRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DistrictReadRepository,
        { provide: db.provide, useValue: db },
        { provide: pagination.cls, useValue: pagination },
      ],
    }).compile();

    repository = moduleRef.get(DistrictReadRepository);
  });

  describe("findById", () => {
    test("should return city by id", async () => {
      db.mockSelectQueryOnce({
        executeTakeFirst: jest.fn().mockResolvedValue(new District()),
      });
      const city = await repository.findById("1");
      expect(city).toBeDefined();
    });
  });

  describe("paginate", () => {
    test("execute", async () => {
      const query = repository.selectQuery.selectAll();
      const res = await repository.paginate(query, new Pagination());
      expect(res).toBeDefined();
    });
  });
});
