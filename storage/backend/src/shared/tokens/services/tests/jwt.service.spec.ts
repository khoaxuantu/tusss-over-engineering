import { TusssConfigModule } from "@/configs/config.module";
import { JwtModule } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import { UserIdentifier } from "../../dtos/jwt.dto";
import { TusssJwtService } from "../jwt.service";

describe(TusssJwtService.name, () => {
  let service: TusssJwtService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [JwtModule.register({}), TusssConfigModule],
      providers: [TusssJwtService],
    }).compile();

    service = moduleRef.get(TusssJwtService);
  });

  describe("signUser", () => {
    test("one round", () => {
      const user = UserIdentifier.create({ name: "abc" });
      const tokens = service.signUser(user);
      const accessVerified = service.verify<UserIdentifier>(tokens.accessToken);
      expect(accessVerified.name).toEqual(user.name);
      const refreshVerified = service.verify<UserIdentifier>(tokens.refreshToken);
      expect(refreshVerified.name).toEqual(user.name);
    });
  });
});
