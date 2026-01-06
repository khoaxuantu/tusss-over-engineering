import { MockDbClient } from "@/shared/db/tests/shared-contexts/db";
import { DeleteResult, UpdateResult } from "kysely";
import { WriteRepository } from "../../abstracts/repository.abstract";
import { HasPrimaryKey } from "../../types";

interface TestWriteProps {
  getDb: () => MockDbClient;
  insertOne: () => ReturnType<typeof WriteRepository.prototype.insertOne>;
  insertMany: () => ReturnType<typeof WriteRepository.prototype.insertMany>;
  update: () => ReturnType<typeof WriteRepository.prototype.update>;
  updateAndReturn: () => Promise<HasPrimaryKey | undefined>;
  delete: () => ReturnType<typeof WriteRepository.prototype.delete>;
}

export function testWriteRepository(props: TestWriteProps) {
  const mockDbClient = props.getDb();

  describe("[shared context] insertOne", () => {
    it("should return inserted id if success", async () => {
      mockDbClient.mockInsertQueryOnce({
        executeTakeFirst: jest.fn().mockResolvedValueOnce({ id: 1 }),
      });
      const res = await props.insertOne();
      expect(res?.id).toEqual(1);
    });

    it("should return undefined if failed", async () => {
      const mockDbClient = props.getDb();
      mockDbClient.mockInsertQueryOnce({
        executeTakeFirst: jest.fn().mockResolvedValueOnce(undefined),
      });
      const res = await props.insertOne();
      expect(res).toBeUndefined();
    });
  });

  describe("[shared context] insertMany", () => {
    it("should return inserted ids if success", async () => {
      mockDbClient.mockInsertQueryOnce({
        execute: jest.fn().mockResolvedValueOnce([{ id: 1 }, { id: 2 }]),
      });
      const res = await props.insertMany();
      expect(res).toEqual([1, 2]);
    });

    it("should return empty array if failed", async () => {
      mockDbClient.mockInsertQueryOnce({
        execute: jest.fn().mockResolvedValueOnce([]),
      });
      const res = await props.insertMany();
      expect(res).toEqual([]);
    });
  });

  describe("[shared context] update", () => {
    it("should return false if no row is updated", async () => {
      const mockExecute = jest.fn().mockResolvedValueOnce(new UpdateResult(BigInt(0), undefined));
      mockDbClient.mockUpdateQueryOnce({ executeTakeFirst: mockExecute });
      const res = await props.update();
      expect(res).toBeFalsy();
    });

    it("should return true if a row is updated", async () => {
      const mockExecute = jest.fn().mockResolvedValueOnce(new UpdateResult(BigInt(1), undefined));
      mockDbClient.mockUpdateQueryOnce({ executeTakeFirst: mockExecute });
      const res = await props.update();
      expect(res).toBeTruthy();
    });
  });

  describe("[shared context] updateAndReturn", () => {
    it("should return undefined if no row is updated", async () => {
      const mockExecute = jest.fn().mockResolvedValueOnce(undefined);
      mockDbClient.mockUpdateQueryOnce({ executeTakeFirst: mockExecute });
      const res = await props.updateAndReturn();
      expect(res).toBeUndefined();
    });

    it("should return defined object if a row is updated", async () => {
      const mockExecute = jest.fn().mockResolvedValueOnce({ id: 1 } satisfies HasPrimaryKey);
      mockDbClient.mockUpdateQueryOnce({ executeTakeFirst: mockExecute });
      const res = await props.updateAndReturn();
      expect(res?.id).toEqual(1);
    });
  });

  describe("[shared context] delete", () => {
    it("should return true if a row is deleted", async () => {
      const mockExecute = jest.fn().mockResolvedValueOnce(new DeleteResult(BigInt(1)));
      mockDbClient.mockDeleteQueryOnce({ executeTakeFirst: mockExecute });
      const res = await props.delete();
      expect(res).toBeTruthy();
    });

    it("should return false if no row is deleted", async () => {
      const mockExecute = jest.fn().mockResolvedValueOnce(new DeleteResult(BigInt(0)));
      mockDbClient.mockDeleteQueryOnce({ executeTakeFirst: mockExecute });
      const res = await props.delete();
      expect(res).toBeFalsy();
    });
  });
}
