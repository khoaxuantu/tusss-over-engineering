import { DbClientProvider } from "@/db/modules/constants";
import { MockDbClient } from "@/db/tests/shared-contexts/db";
import { Seller } from "@/domains/sellers/models/seller.model";
import { Test } from "@nestjs/testing";
import { SellerReadRepository } from "../seller.repository";

describe(SellerReadRepository.name, () => {
  const dbClient = new MockDbClient();

  let repository: SellerReadRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [SellerReadRepository, { provide: DbClientProvider, useValue: dbClient }],
    }).compile();

    repository = moduleRef.get(SellerReadRepository);
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
        executeTakeFirst: jest.fn().mockResolvedValue(new Seller()),
      });
      const res = await repository.findById(1);
      expect(res).toBeDefined();
    });
  });
});
