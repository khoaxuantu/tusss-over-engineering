import { DbClientProvider } from "@/db/modules/constants";
import { MockDbClient } from "@/db/tests/shared-contexts/db";
import { Seller, SellerInsert } from "@/domains/sellers/models/seller.model";
import { Test } from "@nestjs/testing";
import { SellerWriteRepository } from "../seller.repository";

describe(SellerWriteRepository.name, () => {
  const dbClient = new MockDbClient();

  let repository: SellerWriteRepository;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [SellerWriteRepository, { provide: DbClientProvider, useValue: dbClient }],
    }).compile();

    repository = moduleRef.get(SellerWriteRepository);
  });

  test("updater getter", () => {
    expect(repository.updater).toBeDefined();
  });

  describe("insertOne", () => {
    it("should insert", async () => {
      const spyInsert = dbClient.insertInto.mockClear();
      await repository.insertOne(new SellerInsert());
      expect(spyInsert).toHaveBeenCalledTimes(1);
    });
  });

  describe("insertMany", () => {
    it("should insert", async () => {
      dbClient.mockInsertQueryOnce({
        execute: jest.fn().mockResolvedValue([new Seller()]),
      });
      const spyInsert = dbClient.insertInto.mockClear();
      await repository.insertMany([new SellerInsert()]);
      expect(spyInsert).toHaveBeenCalledTimes(1);
    });
  });

  describe("update", () => {
    it("should update", async () => {
      const spyUpdate = dbClient.updateTable.mockClear();
      await repository.update(1, repository.updater);
      expect(spyUpdate).toHaveBeenCalledTimes(1);
    });
  });

  describe("updateAndReturn", () => {
    it("should return undefined if no record found", async () => {
      dbClient.mockUpdateQueryOnce({
        executeTakeFirst: jest.fn().mockResolvedValue(undefined),
      });
      const res = await repository.updateAndReturn(1, repository.updater);
      expect(res).toBeUndefined();
    });

    it("should return defined if record found", async () => {
      dbClient.mockUpdateQueryOnce({
        executeTakeFirst: jest.fn().mockResolvedValue(SellerInsert.create()),
      });
      const res = await repository.updateAndReturn(1, repository.updater);
      expect(res).toBeDefined();
    });
  });

  describe("delete", () => {
    it("should delete", async () => {
      const spyDelete = dbClient.deleteFrom.mockClear();
      await repository.delete(1);
      expect(spyDelete).toHaveBeenCalledTimes(1);
    });
  });
});
