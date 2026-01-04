import { DbClientProvider } from "@/shared/db/modules/constants";
import { MockDbClient, MockSelectQuery } from "@/shared/db/tests/shared-contexts/db";
import { Test } from "@nestjs/testing";
import { stubStoreLocationRecordFlat } from "../../models/tests/stubs/store-location.stub";
import { StoreLocationGetOneQuery, StoreLocationGetOneQueryHandler } from "../get-one.query";

describe(StoreLocationGetOneQuery.name, () => {
  const mockSelectQuery = new MockSelectQuery();
  const db = new MockDbClient({
    selectFrom: jest.fn().mockReturnValue(mockSelectQuery),
  });
  const query = new StoreLocationGetOneQuery(1);

  let handler: StoreLocationGetOneQueryHandler;

  const subject = () => handler.execute(query);

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [StoreLocationGetOneQueryHandler, { provide: DbClientProvider, useValue: db }],
    }).compile();

    handler = moduleRef.get(StoreLocationGetOneQueryHandler);
  });

  it("should return undefined when no data", async () => {
    mockSelectQuery.executeTakeFirst.mockResolvedValueOnce(null);
    const res = await subject();
    expect(res).toBeUndefined();
  });

  it("should return defined object when there is data", async () => {
    mockSelectQuery.executeTakeFirst.mockResolvedValueOnce(stubStoreLocationRecordFlat());
    const res = await subject();
    expect(res).toBeDefined();
  });
});
