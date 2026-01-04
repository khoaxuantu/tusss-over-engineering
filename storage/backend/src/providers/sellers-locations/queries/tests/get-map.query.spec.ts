import { MockDbClient, MockSelectQuery } from "@/shared/db/tests/shared-contexts/db";
import { Test } from "@nestjs/testing";
import { SellerLocation } from "../../models/seller-location.model";
import { SellerLocationGetMapQuery, SellerLocationGetMapQueryHandler } from "../get-map.query";

describe(SellerLocationGetMapQuery.name, () => {
  const query = new SellerLocationGetMapQuery([1]);
  const mockSelectQuery = new MockSelectQuery({
    execute: jest.fn().mockResolvedValue([]),
  });
  const db = new MockDbClient({
    selectFrom: jest.fn().mockReturnValue(mockSelectQuery),
  });

  let handler: SellerLocationGetMapQueryHandler;

  const subject = () => handler.execute(query);

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [SellerLocationGetMapQueryHandler, { provide: db.provide, useValue: db }],
    }).compile();

    handler = moduleRef.get(SellerLocationGetMapQueryHandler);
  });

  it("should return blank map if blank ids", async () => {
    const query = new SellerLocationGetMapQuery([]);
    const res = await handler.execute(query);
    expect(res.size).toEqual(0);
  });

  it("should return blank map if no record returned", async () => {
    const res = await subject();
    expect(res.size).toEqual(0);
  });

  it("should return correct mapping", async () => {
    const rows = [new SellerLocation({ sellerId: 5 })];
    mockSelectQuery.execute.mockResolvedValueOnce(rows);
    const res = await subject();
    expect(res.has(5)).toBeTruthy();
  });
});
