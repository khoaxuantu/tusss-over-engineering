import { createMock } from "@golevelup/ts-jest";
import { Test } from "@nestjs/testing";
import { UserReadRepository, UserRepository, UserWriteRepository } from "../user.repository";

describe(UserRepository.name, () => {
  let repo: UserRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: UserWriteRepository,
          useValue: createMock<UserWriteRepository>(),
        },
        {
          provide: UserReadRepository,
          useValue: createMock<UserReadRepository>(),
        },
      ],
    }).compile();

    repo = moduleRef.get(UserRepository);
  });

  it("should be defined", () => {
    expect(repo).toBeDefined();
  });
});
