import { AuthService } from "@/auth/services/auth.service";
import { User } from "@/users/models/user.model";
import { createMock } from "@golevelup/ts-jest";
import { UnauthorizedException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { LocalStrategy } from "../local.strategy";

describe(LocalStrategy.name, () => {
  let strategy: LocalStrategy;

  beforeAll(async () => {
    const modulRef = await Test.createTestingModule({
      providers: [
        LocalStrategy,
        {
          provide: AuthService,
          useValue: createMock<AuthService>(),
        },
      ],
    }).compile();

    strategy = modulRef.get(LocalStrategy);
  });

  it("should throw error when login failed", async () => {
    jest.spyOn(strategy["auth"], "login").mockResolvedValueOnce(undefined);
    const subject = () => strategy.validate("", "");
    await expect(subject).rejects.toThrow(UnauthorizedException);
  });

  it("should return admin when login successfully", async () => {
    jest.spyOn(strategy["auth"], "login").mockResolvedValueOnce(User.create());
    const res = await strategy.validate("", "");
    expect(res).toBeDefined();
  });
});
