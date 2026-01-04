import { DbClientProvider } from "@/shared/db/modules/constants";
import { MockDbClient, MockSelectQuery } from "@/shared/db/tests/shared-contexts/db";
import { Test } from "@nestjs/testing";
import { stubSellerLocationRecordFlat } from "../../models/tests/stubs/seller-location.stub";
import { SellerLocationGetOneQuery, SellerLocationGetOneQueryHandler } from "../get-one.query";

describe(SellerLocationGetOneQuery.name, () => {
  const mockSelectQuery = new MockSelectQuery();
  const db = new MockDbClient({
    selectFrom: jest.fn().mockReturnValue(mockSelectQuery),
  });
  const query = new SellerLocationGetOneQuery(1);

  let handler: SellerLocationGetOneQueryHandler;

  const subject = () => handler.execute(query);

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [SellerLocationGetOneQueryHandler, { provide: DbClientProvider, useValue: db }],
    }).compile();

    handler = moduleRef.get(SellerLocationGetOneQueryHandler);
  });

  it("should return undefined when no data", async () => {
    mockSelectQuery.executeTakeFirst.mockResolvedValueOnce(null);
    const res = await subject();
    expect(res).toBeUndefined();
  });

  it("should return defined object when there is data", async () => {
    mockSelectQuery.executeTakeFirst.mockResolvedValueOnce(stubSellerLocationRecordFlat());
    const res = await subject();
    expect(res).toBeDefined();
  });
});
