import { Admin } from "@/admins/schemas/admin.schema";
import { DbClientProvider } from "@/db/modules/constants";
import { DbClient } from "@/db/modules/types";
import { WriteRepository } from "@/shared/repos/abstracts/repository.abstract";
import { createMock } from "@golevelup/ts-jest";
import { Test } from "@nestjs/testing";
import { AdminWriteRepository } from "../admin.repository";

describe(AdminWriteRepository.name, () => {
  let repo: AdminWriteRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AdminWriteRepository,
        {
          provide: DbClientProvider,
          useValue: createMock<DbClient>(),
        },
      ],
    }).compile();

    repo = moduleRef.get(AdminWriteRepository);
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

  describe("updateAndReturn", () => {
    it("should return undefined when not found", async () => {
      jest.spyOn(WriteRepository.prototype, "updateAndReturn").mockResolvedValueOnce(undefined);
      const res = await repo.updateAndReturn(1, repo.updateQuery);
      expect(res).toBeUndefined();
    });

    it("should be defined if found", async () => {
      jest
        .spyOn(WriteRepository.prototype, "updateAndReturn")
        .mockResolvedValueOnce(Admin.create());
      const res = await repo.updateAndReturn(1, repo.updateQuery);
      expect(res).toBeDefined();
    });
  });
});
