import { DbClientProvider } from "@/db/modules/constants";
import { MockDbClient } from "@/db/tests/shared-contexts/db";
import { ItemInsert } from "@/items/models/item.model";
import { testWriteRepository } from "@/shared/repos/tests/shared-examples/write";
import { Test } from "@nestjs/testing";
import { ItemWriteRepository } from "../item.repository";

describe(ItemWriteRepository.name, () => {
  const mockDbClient = new MockDbClient();

  let repo: ItemWriteRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ItemWriteRepository,
        {
          provide: DbClientProvider,
          useValue: mockDbClient,
        },
      ],
    }).compile();

    repo = moduleRef.get(ItemWriteRepository);
  });

  testWriteRepository({
    getDb: () => mockDbClient,
    insertOne: async () => await repo.insertOne(ItemInsert.create()),
    insertMany: async () => await repo.insertMany([ItemInsert.create()]),
    update: async () => await repo.update(1, repo.updater),
    updateAndReturn: async () => await repo.updateAndReturn(1, repo.updater),
    delete: async () => await repo.delete(1),
  });
});
