import { DbClientProvider } from "@/db/modules/constants";
import { DbClient } from "@/db/modules/types";
import { WriteRepository } from "@/shared/repos/abstracts/repository.abstract";
import { TokenService } from "@/shared/tokens/services/token.service";
import { User } from "@/users/models/user.model";
import { createMock } from "@golevelup/ts-jest";
import { Test } from "@nestjs/testing";
import { UserWriteRepository } from "../user.repository";

describe(UserWriteRepository.name, () => {
  let repo: UserWriteRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserWriteRepository,
        {
          provide: DbClientProvider,
          useValue: createMock<DbClient>(),
        },
        {
          provide: TokenService,
          useValue: createMock<TokenService>({
            password: {
              hash: () => Promise.resolve("encrypted"),
            },
          }),
        },
      ],
    }).compile();

    repo = moduleRef.get(UserWriteRepository);
  });

  describe("updateQuery", () => {
    it("should be defined", () => {
      expect(repo.updateQuery).toBeDefined();
    });
  });

  describe("insertQuery", () => {
    it("should be defined", () => {
      expect(repo.insertQuery).toBeDefined();
    });
  });

  describe("deleteQuery", () => {
    it("should be defined", () => {
      expect(repo.deleteQuery).toBeDefined();
    });
  });

  describe("insertOne", () => {
    it("should call hash password", async () => {
      const spyHash = jest.spyOn(repo["token"].password, "hash");
      await repo.insertOne({ ...User.create(), password: "fdsafsd" });
      expect(spyHash).toHaveBeenCalledTimes(1);
    });
  });

  describe("insertMany", () => {
    it("should hash passwords", async () => {
      const spyHash = jest.spyOn(repo["token"].password, "hash");
      spyHash.mockClear();
      const payload = { ...User.create(), password: "abc" };
      await repo.insertMany([payload, payload]);
      expect(spyHash).toHaveBeenCalledTimes(2);
    });
  });

  describe("updateAndReturn", () => {
    it("should return undefined when not found", async () => {
      jest.spyOn(WriteRepository.prototype, "updateAndReturn").mockResolvedValueOnce(undefined);
      const res = await repo.updateAndReturn(1, repo.updateQuery);
      expect(res).toBeUndefined();
    });

    it("should be defined if found", async () => {
      jest.spyOn(WriteRepository.prototype, "updateAndReturn").mockResolvedValueOnce(User.create());
      const res = await repo.updateAndReturn(1, repo.updateQuery);
      expect(res).toBeDefined();
    });
  });
});
