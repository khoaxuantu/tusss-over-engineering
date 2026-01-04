import { InjectDbClient } from "@/shared/db/decorators/inject-client.decorator";
import type { DbClient } from "@/shared/db/modules/types";
import { IQueryHandler, Query, QueryHandler } from "@nestjs/cqrs";
import { SellerLocation, SellerLocationRecordFlat } from "../models/seller-location.model";

export class SellerLocationGetMapQuery extends Query<Map<number, SellerLocation>> {
  constructor(readonly sellerIds: number[]) {
    super();
  }
}

@QueryHandler(SellerLocationGetMapQuery)
export class SellerLocationGetMapQueryHandler implements IQueryHandler<SellerLocationGetMapQuery> {
  constructor(
    @InjectDbClient()
    private readonly db: DbClient,
  ) {}

  async execute(query: SellerLocationGetMapQuery): Promise<Map<number, SellerLocation>> {
    const map = new Map<number, SellerLocation>();
    if (!query.sellerIds.length) return map;

    const q = this.db
      .selectFrom("sellersLocations as sl")
      .leftJoin("cities", "sl.cityId", "cities.id")
      .leftJoin("districts", "sl.districtId", "districts.id")
      .where("sl.sellerId", "in", query.sellerIds)
      .select([
        "sl.cityId as cityId",
        "sl.districtId as districtId",
        "sl.sellerId as sellerId",
        "cities.id as city.id",
        "cities.name as city.name",
        "districts.id as district.id",
        "districts.name as district.name",
      ]);

    const data: SellerLocationRecordFlat[] = await q.execute();

    data.forEach((item) => {
      map.set(item.sellerId, SellerLocation.fromFlat(item));
    });

    return map;
  }
}
