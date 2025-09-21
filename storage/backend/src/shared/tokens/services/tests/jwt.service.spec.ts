import { TusssConfigModule } from "@/configs/config.module";
import { JwtModule } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import { UserJwtPayload } from "../../dtos/jwt.dto";
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
      const user = UserJwtPayload.create({ name: "abc" });
      const tokens = service.signUser(user);
      const accessVerified = service.verify<UserJwtPayload>(tokens.accessToken);
      expect(accessVerified.name).toEqual(user.name);
      const refreshVerified = service.verify<UserJwtPayload>(tokens.refreshToken);
      expect(refreshVerified.name).toEqual(user.name);
    });
  });
});
