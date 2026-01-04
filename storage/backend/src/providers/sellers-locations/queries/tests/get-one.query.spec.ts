import { City } from "@/domains/locations/cities/city.model";
import { District } from "@/domains/locations/districts/district.model";
import { DbClientProvider } from "@/shared/db/modules/constants";
import { MockDbClient, MockSelectQuery } from "@/shared/db/tests/shared-contexts/db";
import { Test } from "@nestjs/testing";
import { SellerLocation } from "../../models/seller-location.model";
import { SellerLocationGetOneQuery, SellerLocationGetOneQueryHandler } from "../get-one.query";

describe(SellerLocationGetOneQuery.name, () => {
  const mockSelectQuery = new MockSelectQuery();
  const db = new MockDbClient({
    selectFrom: jest.fn().mockReturnValue(mockSelectQuery),
  });
  const query = new SellerLocationGetOneQuery(1);

  let handler: SellerLocationGetOneQueryHandler;

  const subject = () => handler.execute(query);

  const rawData = (obj?: SellerLocation) => {
    return {
      cityId: obj?.cityId,
      districtId: obj?.districtId,
      sellerId: obj?.sellerId,
      "city.id": obj?.city?.id ?? null,
      "city.name": obj?.city?.name ?? null,
      "district.id": obj?.district?.id ?? null,
      "district.name": obj?.district?.name ?? null,
    };
  };

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

  it("should map city when there is city data", async () => {
    const raw = rawData(
      new SellerLocation({
        city: new City({ id: "abc", name: "abc" }),
      }),
    );
    mockSelectQuery.executeTakeFirst.mockResolvedValueOnce(raw);
    const res = await subject();
    expect(res?.city).toBeDefined();
  });

  it("should not map city when city id is blank", async () => {
    const raw = rawData(
      new SellerLocation({
        city: new City(),
      }),
    );
    mockSelectQuery.executeTakeFirst.mockResolvedValueOnce(raw);
    const res = await subject();
    expect(res?.city).toBeUndefined();
  });

  it("should map district when there is district data", async () => {
    mockSelectQuery.executeTakeFirst.mockResolvedValueOnce(
      rawData(
        new SellerLocation({
          district: new District({ id: "abc", name: "abc" }),
        }),
      ),
    );
    const res = await subject();
    expect(res?.district).toBeDefined();
  });

  it("should not map district when district id is blank", async () => {
    const raw = rawData(
      new SellerLocation({
        district: new District(),
      }),
    );
    mockSelectQuery.executeTakeFirst.mockResolvedValueOnce(raw);
    const res = await subject();
    expect(res?.district).toBeUndefined();
  });
});
