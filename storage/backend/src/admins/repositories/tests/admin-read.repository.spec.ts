import { Admin } from "@/admins/schemas/admin.schema";
import { DbClientProvider } from "@/db/modules/constants";
import { DbClient } from "@/db/modules/types";
import { ReadRepository } from "@/shared/repos/abstracts/repository.abstract";
import { createMock } from "@golevelup/ts-jest";
import { Test } from "@nestjs/testing";
import { AdminReadRepository } from "../admin.repository";

describe(AdminReadRepository.name, () => {
  let repo: AdminReadRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AdminReadRepository,
        {
          provide: DbClientProvider,
          useValue: createMock<DbClient>(),
        },
      ],
    }).compile();

    repo = module.get<AdminReadRepository>(AdminReadRepository);
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
      jest.spyOn(ReadRepository.prototype, "findById").mockResolvedValueOnce(Admin.create());
      const res = await repo.findById(1);
      expect(res).toBeDefined();
    });
  });
});
