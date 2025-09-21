import { TokenService } from "@/shared/tokens/services/token.service";
import { UserRepository } from "@/users/repositories/user.repository";
import { User } from "@/users/schemas/user.schema";
import { createMock } from "@golevelup/ts-jest";
import { Test } from "@nestjs/testing";
import { AuthService } from "../auth.service";

describe(AuthService.name, () => {
  let service: AuthService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: TokenService,
          useValue: createMock<TokenService>(),
        },
        {
          provide: UserRepository,
          useValue: createMock<UserRepository>(),
        },
      ],
    }).compile();

    service = moduleRef.get<AuthService>(AuthService);
  });

  describe("login", () => {
    const subject = () => service.login("", "");
    it("should return false if no encrypted pwd found", async () => {
      jest.spyOn(service["adminRepo"].read, "getPassword").mockResolvedValueOnce(undefined);
      const res = await subject();
      expect(res).toBeFalsy();
    });

    it("should return false if encrypted password is blank", async () => {
      jest.spyOn(service["adminRepo"].read, "getPassword").mockResolvedValueOnce({
        id: 1,
        password: "",
      });
      const res = await subject();
      expect(res).toBeFalsy();
    });

    it("should return false if check password failed", async () => {
      jest.spyOn(service["adminRepo"].read, "getPassword").mockResolvedValueOnce({
        id: 1,
        password: "fdsafs",
      });
      jest.spyOn(service["tokenService"].password, "check").mockResolvedValueOnce(false);
      const res = await subject();
      expect(res).toBeFalsy();
    });

    it("should return true if check true and admin found", async () => {
      jest.spyOn(service["adminRepo"].read, "getPassword").mockResolvedValueOnce({
        id: 1,
        password: "fdsfs",
      });
      jest.spyOn(service["tokenService"].password, "check").mockResolvedValueOnce(true);
      jest.spyOn(service["adminRepo"].read, "findById").mockResolvedValueOnce(User.create());
      const res = await subject();
      expect(res).toBeTruthy();
    });
  });
});
