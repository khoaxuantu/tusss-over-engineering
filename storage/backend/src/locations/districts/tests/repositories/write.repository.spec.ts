import { DbClientProvider } from "@/db/modules/constants";
import { MockDbClient } from "@/db/tests/shared-contexts/db";
import { Test } from "@nestjs/testing";
import { DistrictInsert } from "../../district.model";
import { DistrictWriteRepository } from "../../district.repository";

describe(DistrictWriteRepository.name, () => {
  const db = new MockDbClient();

  let repository: DistrictWriteRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [DistrictWriteRepository, { provide: DbClientProvider, useValue: db }],
    }).compile();

    repository = moduleRef.get(DistrictWriteRepository);
  });

  describe("insertOne", () => {
    it("should insert", async () => {
      const spyInsert = db.insertInto.mockClear();
      await repository.insertOne(new DistrictInsert());
      expect(spyInsert).toHaveBeenCalledTimes(1);
    });
  });

  describe("insertMany", () => {
    it("should insert", async () => {
      const spyExecute = jest.fn();
      db.mockInsertQueryOnce({ execute: spyExecute });
      await repository.insertMany([new DistrictInsert()]);
      expect(spyExecute).toHaveBeenCalledTimes(1);
    });
  });
});
