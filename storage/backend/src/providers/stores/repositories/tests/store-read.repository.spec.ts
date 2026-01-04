import { DbClientProvider } from "@/shared/db/modules/constants";
import { MockDbClient } from "@/shared/db/tests/shared-contexts/db";
import { Test } from "@nestjs/testing";
import { Store } from "../../models/store.model";
import { StoreReadRepository } from "../store.repository";

describe(StoreReadRepository.name, () => {
  const dbClient = new MockDbClient();

  let repository: StoreReadRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [StoreReadRepository, { provide: DbClientProvider, useValue: dbClient }],
    }).compile();

    repository = moduleRef.get(StoreReadRepository);
  });

  test("selectQuery getter", () => {
    expect(repository.selectQuery).toBeDefined();
  });

  describe("findById", () => {
    it("should return undefined if no record found", async () => {
      dbClient.mockSelectQueryOnce({
        executeTakeFirst: jest.fn().mockResolvedValue(undefined),
      });
      const res = await repository.findById(1);
      expect(res).toBeUndefined();
    });

    it("should return seller", async () => {
      dbClient.mockSelectQueryOnce({
        executeTakeFirst: jest.fn().mockResolvedValue(new Store()),
      });
      const res = await repository.findById(1);
      expect(res).toBeDefined();
    });
  });
});
