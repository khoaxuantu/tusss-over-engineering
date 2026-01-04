import { User } from "@/domains/users/models/user.model";
import { DbClientProvider } from "@/shared/db/modules/constants";
import { Db, DbClient, DbTable } from "@/shared/db/modules/types";
import { ReadRepository } from "@/shared/repos/abstracts/repository.abstract";
import { createMock } from "@golevelup/ts-jest";
import { Test } from "@nestjs/testing";
import { SelectQueryBuilder } from "kysely";
import { UserReadRepository } from "../user.repository";

describe(UserReadRepository.name, () => {
  const mockSelect = createMock<SelectQueryBuilder<Db, DbTable, any>>({
    where: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    executeTakeFirst: jest.fn(),
  });
  const mockDbClient = createMock<DbClient>();

  let repo: UserReadRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserReadRepository,
        {
          provide: DbClientProvider,
          useValue: mockDbClient,
        },
      ],
    }).compile();

    repo = module.get<UserReadRepository>(UserReadRepository);
  });

  describe("selectQuery", () => {
    it("should be defined", () => {
      const explain = repo.selectQuery;
      expect(explain).toBeDefined();
    });
  });

  describe("findById", () => {
    it("should return undefined when not found", async () => {
      jest.spyOn(ReadRepository.prototype, "findById").mockResolvedValueOnce(undefined);
      const res = await repo.findById(1);
      expect(res).toBeUndefined();
    });

    it("should return admin when found", async () => {
      jest.spyOn(ReadRepository.prototype, "findById").mockResolvedValueOnce(User.create());
      const res = await repo.findById(1);
      expect(res).toBeDefined();
    });
  });

  describe("getPassword", () => {
    it("should return undefined when not found", async () => {
      mockDbClient.selectFrom.mockReturnValueOnce(mockSelect);
      mockSelect.executeTakeFirst.mockResolvedValueOnce(undefined);
      const res = await repo.getPassword("abc");
      expect(res).toBeUndefined();
    });

    it("should return admin when found", async () => {
      mockDbClient.selectFrom.mockReturnValueOnce(mockSelect);
      mockSelect.executeTakeFirst.mockResolvedValueOnce({ password: "abc", id: 123 });
      const res = await repo.getPassword("abc");
      expect(res).toBeDefined();
    });
  });
});
