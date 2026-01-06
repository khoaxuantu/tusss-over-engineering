import { InjectDbClient } from "@/shared/db/decorators/inject-client.decorator";
import type { DbClient } from "@/shared/db/modules/types";
import { IQueryHandler, Query, QueryHandler } from "@nestjs/cqrs";
import { StoreLocation, StoreLocationRecordFlat } from "../models/store-location.model";

export class StoreLocationGetOneQuery extends Query<StoreLocation | undefined> {
  constructor(readonly id: number) {
    super();
  }
}

@QueryHandler(StoreLocationGetOneQuery)
export class StoreLocationGetOneQueryHandler implements IQueryHandler<StoreLocationGetOneQuery> {
  constructor(
    @InjectDbClient()
    private readonly db: DbClient,
  ) {}

  async execute(query: StoreLocationGetOneQuery): Promise<StoreLocation | undefined> {
    const q = this.db
      .selectFrom("storesLocations as sl")
      .leftJoin("cities", "sl.cityId", "cities.id")
      .leftJoin("districts", "sl.districtId", "districts.id")
      .where("sl.storeId", "=", query.id)
      .select([
        "sl.cityId as cityId",
        "sl.districtId as districtId",
        "sl.storeId as storeId",
        "cities.id as city.id",
        "cities.name as city.name",
        "districts.id as district.id",
        "districts.name as district.name",
      ]);

    const data: StoreLocationRecordFlat | undefined = await q.executeTakeFirst();
    if (!data) return undefined;

    const sl = StoreLocation.fromFlat(data);

    return sl;
  }
}
