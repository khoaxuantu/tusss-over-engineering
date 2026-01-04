import { createMock } from "@golevelup/ts-jest";
import { Test } from "@nestjs/testing";
import {
  SellerReadRepository,
  SellerRepository,
  SellerWriteRepository,
} from "../seller.repository";

describe(SellerRepository.name, () => {
  const read = createMock<SellerReadRepository>();
  const write = createMock<SellerWriteRepository>();

  let repository: SellerRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        SellerRepository,
        { provide: SellerReadRepository, useValue: read },
        { provide: SellerWriteRepository, useValue: write },
      ],
    }).compile();

    repository = moduleRef.get(SellerRepository);
  });

  it("should be defined", () => {
    expect(repository).toBeDefined();
  });
});
