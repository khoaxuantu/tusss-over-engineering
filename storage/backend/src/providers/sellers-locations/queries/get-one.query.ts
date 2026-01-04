import { City } from "@/domains/locations/cities/city.model";
import { District } from "@/domains/locations/districts/district.model";
import { InjectDbClient } from "@/shared/db/decorators/inject-client.decorator";
import type { DbClient } from "@/shared/db/modules/types";
import { IQueryHandler, Query, QueryHandler } from "@nestjs/cqrs";
import { toOptional } from "@tusss/core";
import { SellerLocation } from "../models/seller-location.model";

export class SellerLocationGetOneQuery extends Query<SellerLocation | undefined> {
  constructor(readonly id: number) {
    super();
  }
}

@QueryHandler(SellerLocationGetOneQuery)
export class SellerLocationGetOneQueryHandler implements IQueryHandler<SellerLocationGetOneQuery> {
  constructor(
    @InjectDbClient()
    private readonly db: DbClient,
  ) {}

  async execute(query: SellerLocationGetOneQuery): Promise<SellerLocation | undefined> {
    const q = this.db
      .selectFrom("sellersLocations as sl")
      .leftJoin("cities", "sl.cityId", "cities.id")
      .leftJoin("districts", "sl.districtId", "districts.id")
      .where("sl.sellerId", "=", query.id)
      .select([
        "sl.cityId as cityId",
        "sl.districtId as districtId",
        "sl.sellerId as sellerId",
        "cities.id as city.id",
        "cities.name as city.name",
        "districts.id as district.id",
        "districts.name as district.name",
      ]);

    const data = await q.executeTakeFirst();
    if (!data) return undefined;

    const sl = SellerLocation.create({
      cityId: data.cityId,
      districtId: data.districtId,
      sellerId: data.sellerId,
    });

    if (data["city.id"]) {
      sl.city = new City({
        id: data["city.id"],
        name: toOptional(data["city.name"]),
      });
    }

    if (data["district.id"]) {
      sl.district = new District({
        id: data["district.id"],
        name: toOptional(data["district.name"]),
      });
    }

    return sl;
  }
}
