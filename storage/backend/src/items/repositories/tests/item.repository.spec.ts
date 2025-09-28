import { createMock } from "@golevelup/ts-jest";
import { Test } from "@nestjs/testing";
import { ItemReadRepository, ItemRepository, ItemWriteRepository } from "../item.repository";

describe(ItemRepository.name, () => {
  let repo: ItemRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        ItemRepository,
        {
          provide: ItemReadRepository,
          useValue: createMock<ItemReadRepository>(),
        },
        {
          provide: ItemWriteRepository,
          useValue: createMock<ItemWriteRepository>(),
        },
      ],
    }).compile();

    repo = moduleRef.get(ItemRepository);
  });

  it("should be defined", () => {
    expect(repo).toBeDefined();
  });
});
