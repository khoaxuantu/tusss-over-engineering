import { MockDbClient } from "@/shared/db/tests/shared-contexts/db";
import { Test } from "@nestjs/testing";
import { SellerLocationInsert } from "../../models/seller-location.model";
import { SellerLocationWriteRepository } from "../seller-location.repository";

describe(SellerLocationWriteRepository.name, () => {
  const db = new MockDbClient();

  let repository: SellerLocationWriteRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [SellerLocationWriteRepository, { provide: db.provide, useValue: db }],
    }).compile();

    repository = moduleRef.get(SellerLocationWriteRepository);
  });

  describe("insertOne", () => {
    it("should call insertInto", async () => {
      const spyInsert = db.insertInto.mockClear();
      await repository.insertOne(SellerLocationInsert.create());
      expect(spyInsert).toHaveBeenCalledTimes(1);
    });
  });
});
