import { DbClientProvider } from "@/db/modules/constants";
import { MockDbClient } from "@/db/tests/shared-contexts/db";
import { CityInsert } from "@/locations/models/city.model";
import { HasPrimaryKey } from "@/shared/repos/types";
import { Test } from "@nestjs/testing";
import { CityWriteRepository } from "../../city.repository";

describe(CityWriteRepository.name, () => {
  const db = new MockDbClient();

  let repository: CityWriteRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [CityWriteRepository, { provide: DbClientProvider, useValue: db }],
    }).compile();

    repository = moduleRef.get(CityWriteRepository);
  });

  describe("insertOne", () => {
    it("should insert", async () => {
      const spyInsert = db.insertInto.mockClear();
      await repository.insertOne(new CityInsert());
      expect(spyInsert).toHaveBeenCalledTimes(1);
    });
  });

  describe("insertMany", () => {
    it("should insert", async () => {
      const objs = [new CityInsert({ id: "1" }), new CityInsert({ id: "2" })];
      db.mockInsertQueryOnce({
        execute: jest
          .fn()
          .mockResolvedValue([
            { id: objs[0].id },
            { id: objs[1].id },
          ] satisfies HasPrimaryKey<string>[]),
      });
      const spyInsert = db.insertInto.mockClear();
      await repository.insertMany(objs);
      expect(spyInsert).toHaveBeenCalledTimes(1);
    });
  });
});
