import { createMock } from "@golevelup/ts-jest";
import { Test } from "@nestjs/testing";
import { AdminReadRepository, AdminRepository, AdminWriteRepository } from "../admin.repository";

describe(AdminRepository.name, () => {
  let repo: AdminRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AdminRepository,
        {
          provide: AdminWriteRepository,
          useValue: createMock<AdminWriteRepository>(),
        },
        {
          provide: AdminReadRepository,
          useValue: createMock<AdminReadRepository>(),
        },
      ],
    }).compile();

    repo = moduleRef.get(AdminRepository);
  });

  it("should be defined", () => {
    expect(repo).toBeDefined();
  });
});
