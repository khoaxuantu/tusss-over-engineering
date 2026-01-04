import { Role } from "@/db/types/enums.auto";
import { TusssConfigModule } from "@/shared/configs/config.module";
import { UserIdentifier } from "@/shared/tokens/dtos/jwt.dto";
import { UnauthorizedException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { JwtRefreshStrategy } from "../jwt-refresh.strategy";

describe(JwtRefreshStrategy.name, () => {
  let strategy: JwtRefreshStrategy;

  beforeAll(async () => {
    const modulRef = await Test.createTestingModule({
      imports: [TusssConfigModule],
      providers: [JwtRefreshStrategy],
    }).compile();

    strategy = modulRef.get(JwtRefreshStrategy);
  });

  describe("when invalid payload", () => {
    it("should throw error", async () => {
      const subject = () => strategy.validate({ invalid: true });
      await expect(subject).rejects.toThrow(UnauthorizedException);
    });
  });

  describe("when user is valid", () => {
    it("should return user", async () => {
      const user = UserIdentifier.toPlain({
        id: 1,
        name: "An user",
        roles: [Role.ADMIN],
      });
      const res = await strategy.validate(user);
      expect(res).toBeInstanceOf(UserIdentifier);
    });
  });
});
