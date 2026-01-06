import { createMock } from "@golevelup/ts-jest";
import { Test } from "@nestjs/testing";
import { StoreReadRepository, StoreRepository, StoreWriteRepository } from "../store.repository";

describe(StoreRepository.name, () => {
  const read = createMock<StoreReadRepository>();
  const write = createMock<StoreWriteRepository>();

  let repository: StoreRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        StoreRepository,
        { provide: StoreReadRepository, useValue: read },
        { provide: StoreWriteRepository, useValue: write },
      ],
    }).compile();

    repository = moduleRef.get(StoreRepository);
  });

  it("should be defined", () => {
    expect(repository).toBeDefined();
  });
});
