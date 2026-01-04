import { User } from "@/domains/users/models/user.model";
import { TokenService } from "@/providers/tokens/services/token.service";
import { DbClientProvider } from "@/shared/db/modules/constants";
import { MockDbClient } from "@/shared/db/tests/shared-contexts/db";
import { createMock } from "@golevelup/ts-jest";
import { Test } from "@nestjs/testing";
import { UserWriteRepository } from "../user.repository";

describe(UserWriteRepository.name, () => {
  const mockDbClient = new MockDbClient();

  let repo: UserWriteRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserWriteRepository,
        {
          provide: DbClientProvider,
          useValue: mockDbClient,
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

  describe("insertOne", () => {
    it("should call hash password", async () => {
      const spyHash = jest.spyOn(repo["token"].password, "hash");
      await repo.insertOne({ ...User.create(), password: "fdsafsd" });
      expect(spyHash).toHaveBeenCalledTimes(1);
    });
  });

  describe("insertMany", () => {
    it("should hash passwords", async () => {
      mockDbClient.mockInsertQueryOnce({
        execute: jest.fn().mockResolvedValueOnce([]),
      });
      const spyHash = jest.spyOn(repo["token"].password, "hash");
      spyHash.mockClear();
      const payload = { ...User.create(), password: "abc" };
      await repo.insertMany([payload, payload]);
      expect(spyHash).toHaveBeenCalledTimes(2);
    });
  });

  describe("updateAndReturn", () => {
    it("should return undefined when not found", async () => {
      mockDbClient.mockUpdateQueryOnce({
        executeTakeFirst: jest.fn().mockResolvedValueOnce(undefined),
      });
      const res = await repo.updateAndReturn(1, repo.updater);
      expect(res).toBeUndefined();
    });

    it("should be defined if found", async () => {
      mockDbClient.mockUpdateQueryOnce({
        executeTakeFirst: jest.fn().mockResolvedValueOnce(User.create()),
      });
      const res = await repo.updateAndReturn(1, repo.updater);
      expect(res).toBeDefined();
    });
  });
});
