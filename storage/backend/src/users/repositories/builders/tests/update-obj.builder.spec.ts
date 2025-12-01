import { Role } from "@/db/types/enums.auto";
import { PasswordService } from "@/shared/tokens/services/password.service";
import { TokenService } from "@/shared/tokens/services/token.service";
import { createMock } from "@golevelup/ts-jest";
import { Test } from "@nestjs/testing";
import { UserUpdateObjBuilder } from "../update-obj.builder";

describe(UserUpdateObjBuilder.name, () => {
  let token: TokenService;

  const getBuilder = () => new UserUpdateObjBuilder(token);

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: TokenService,
          useValue: createMock<TokenService>({
            password: new PasswordService(),
          }),
        },
      ],
    }).compile();

    token = moduleRef.get<TokenService>(TokenService);
  });

  describe("setName", () => {
    it("should set name", () => {
      const builder = getBuilder().setName("abc");
      expect(builder.build()).toMatchObject({ name: "abc" });
    });
  });

  describe("setRoles", () => {
    it("should set roles", () => {
      const builder = getBuilder().setRoles([Role.ADMIN]);
      expect(builder.build()).toMatchObject({ roles: [Role.ADMIN] });
    });
  });

  describe("setPwd", () => {
    it("should set hashed password", async () => {
      const builder = getBuilder().setPwd("abc", 2);
      const product = builder.build();
      expect(product.password).toBeDefined();
      const checkPwd = await token.password.check("abc", product.password!);
      expect(checkPwd).toBeTruthy();
    });
  });
});
