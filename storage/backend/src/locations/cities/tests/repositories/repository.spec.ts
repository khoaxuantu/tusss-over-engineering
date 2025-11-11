import { createMock } from "@golevelup/ts-jest";
import { Test } from "@nestjs/testing";
import { CityRepository, CityWriteRepository } from "../../city.repository";

describe(CityRepository.name, () => {
  const write = createMock<CityWriteRepository>();

  let repository: CityRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [CityRepository, { provide: CityWriteRepository, useValue: write }],
    }).compile();

    repository = moduleRef.get(CityRepository);
  });

  it("should be defined", () => {
    expect(repository).toBeDefined();
  });
});
