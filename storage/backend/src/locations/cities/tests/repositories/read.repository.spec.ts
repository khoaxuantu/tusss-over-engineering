import { DbClientProvider } from "@/db/modules/constants";
import { MockDbClient } from "@/db/tests/shared-contexts/db";
import { Pagination } from "@/shared/models/pagination.model";
import { Sort } from "@/shared/models/sort.model";
import { PaginationHelper } from "@/shared/repos/helpers/pagination.helper";
import { MockPaginationHelper } from "@/shared/repos/helpers/tests/mocks/pagination.helper";
import { Test } from "@nestjs/testing";
import { City } from "../../city.model";
import { CityReadRepository } from "../../city.repository";

describe(CityReadRepository.name, () => {
  const db = new MockDbClient();
  const pagination = new MockPaginationHelper();

  let repository: CityReadRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CityReadRepository,
        { provide: DbClientProvider, useValue: db },
        { provide: PaginationHelper, useValue: pagination },
      ],
    }).compile();

    repository = moduleRef.get(CityReadRepository);
  });

  describe("findById", () => {
    test("should return city by id", async () => {
      db.mockSelectQueryOnce({
        executeTakeFirst: jest.fn().mockResolvedValue(new City()),
      });
      const city = await repository.findById("1");
      expect(city).toBeDefined();
    });
  });

  describe("paginate", () => {
    test("execute", async () => {
      const query = repository.selectQuery.selectAll();
      const res = await repository.paginate(query, new Pagination(), [
        new Sort({ direction: "asc", field: "name" }),
      ]);
      expect(res).toBeDefined();
    });
  });
});
