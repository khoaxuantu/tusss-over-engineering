import { DbClientProvider } from "@/db/modules/constants";
import { MockDbClient } from "@/db/tests/shared-contexts/db";
import { Item } from "@/domains/items/models/item.model";
import { Test } from "@nestjs/testing";
import { ItemReadRepository } from "../item.repository";

describe(ItemReadRepository.name, () => {
  const mockDbClient = new MockDbClient();

  let repo: ItemReadRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ItemReadRepository,
        {
          provide: DbClientProvider,
          useValue: mockDbClient,
        },
      ],
    }).compile();

    repo = moduleRef.get(ItemReadRepository);
  });

  describe("findById", () => {
    it("should return undefined if not found", async () => {
      mockDbClient.mockSelectQueryOnce({
        executeTakeFirst: jest.fn().mockResolvedValueOnce(undefined),
      });
      const res = await repo.findById(1);
      expect(res).toBeUndefined();
    });

    it("should return item if found", async () => {
      mockDbClient.mockSelectQueryOnce({
        executeTakeFirst: jest.fn().mockResolvedValueOnce(Item.create()),
      });
    });
  });
});
