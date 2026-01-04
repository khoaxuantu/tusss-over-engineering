import { MockDbClient, MockSelectQuery } from "@/shared/db/tests/shared-contexts/db";
import { Test } from "@nestjs/testing";
import { StoreLocation } from "../../models/store-location.model";
import { StoreLocationGetMapQuery, StoreLocationGetMapQueryHandler } from "../get-map.query";

describe(StoreLocationGetMapQuery.name, () => {
  const query = new StoreLocationGetMapQuery([1]);
  const mockSelectQuery = new MockSelectQuery({
    execute: jest.fn().mockResolvedValue([]),
  });
  const db = new MockDbClient({
    selectFrom: jest.fn().mockReturnValue(mockSelectQuery),
  });

  let handler: StoreLocationGetMapQueryHandler;

  const subject = () => handler.execute(query);

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [StoreLocationGetMapQueryHandler, { provide: db.provide, useValue: db }],
    }).compile();

    handler = moduleRef.get(StoreLocationGetMapQueryHandler);
  });

  it("should return blank map if blank ids", async () => {
    const query = new StoreLocationGetMapQuery([]);
    const res = await handler.execute(query);
    expect(res.size).toEqual(0);
  });

  it("should return blank map if no record returned", async () => {
    const res = await subject();
    expect(res.size).toEqual(0);
  });

  it("should return correct mapping", async () => {
    const rows = [new StoreLocation({ storeId: 5 })];
    mockSelectQuery.execute.mockResolvedValueOnce(rows);
    const res = await subject();
    expect(res.has(5)).toBeTruthy();
  });
});
