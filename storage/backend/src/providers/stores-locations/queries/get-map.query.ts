import { InjectDbClient } from "@/shared/db/decorators/inject-client.decorator";
import type { DbClient } from "@/shared/db/modules/types";
import { IQueryHandler, Query, QueryHandler } from "@nestjs/cqrs";
import { StoreLocation, StoreLocationRecordFlat } from "../models/store-location.model";

export class StoreLocationGetMapQuery extends Query<Map<number, StoreLocation>> {
  constructor(readonly storeIds: number[]) {
    super();
  }
}

@QueryHandler(StoreLocationGetMapQuery)
export class StoreLocationGetMapQueryHandler implements IQueryHandler<StoreLocationGetMapQuery> {
  constructor(
    @InjectDbClient()
    private readonly db: DbClient,
  ) {}

  async execute(query: StoreLocationGetMapQuery): Promise<Map<number, StoreLocation>> {
    const map = new Map<number, StoreLocation>();
    if (!query.storeIds.length) return map;

    const q = this.db
      .selectFrom("storesLocations as sl")
      .leftJoin("cities", "sl.cityId", "cities.id")
      .leftJoin("districts", "sl.districtId", "districts.id")
      .where("sl.storeId", "in", query.storeIds)
      .select([
        "sl.cityId as cityId",
        "sl.districtId as districtId",
        "sl.storeId as storeId",
        "cities.id as city.id",
        "cities.name as city.name",
        "districts.id as district.id",
        "districts.name as district.name",
      ]);

    const data: StoreLocationRecordFlat[] = await q.execute();

    data.forEach((item) => {
      map.set(item.storeId, StoreLocation.fromFlat(item));
    });

    return map;
  }
}
