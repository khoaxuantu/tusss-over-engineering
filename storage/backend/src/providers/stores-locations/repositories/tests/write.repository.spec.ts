import { MockDbClient } from "@/shared/db/tests/shared-contexts/db";
import { Test } from "@nestjs/testing";
import { StoreLocationInsert } from "../../models/store-location.model";
import { StoreLocationWriteRepository } from "../store-location.repository";

describe(StoreLocationWriteRepository.name, () => {
  const db = new MockDbClient();

  let repository: StoreLocationWriteRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [StoreLocationWriteRepository, { provide: db.provide, useValue: db }],
    }).compile();

    repository = moduleRef.get(StoreLocationWriteRepository);
  });

  describe("insertOne", () => {
    it("should call insertInto", async () => {
      const spyInsert = db.insertInto.mockClear();
      await repository.insertOne(StoreLocationInsert.create());
      expect(spyInsert).toHaveBeenCalledTimes(1);
    });
  });
});
