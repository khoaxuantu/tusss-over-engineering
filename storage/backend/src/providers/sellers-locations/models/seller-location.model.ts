import { City, CityRecordModel } from "@/domains/locations/cities/city.model";
import { District, DistrictRecordModel } from "@/domains/locations/districts/district.model";
import { SellerLocationTable } from "@/shared/db/types/schemas.auto";
import { toOptional } from "@tusss/core";
import { Insertable, Selectable } from "kysely";

export type SellerLocationInsertModel = Insertable<SellerLocationTable>;
export type SellerLocationRecordModel = Selectable<SellerLocationTable> & {
  city?: CityRecordModel;
  district?: DistrictRecordModel;
};
export type SellerLocationRecordFlat = Selectable<SellerLocationTable> & {
  "city.id": string | null;
  "city.name": string | null;
  "district.id": string | null;
  "district.name": string | null;
};

export class SellerLocation implements SellerLocationRecordModel {
  sellerId: number;
  cityId: string;
  districtId: string;

  city?: CityRecordModel;
  district?: DistrictRecordModel;

  constructor(data?: Partial<SellerLocationRecordModel>) {
    this.sellerId = data?.sellerId || 0;
    this.cityId = data?.cityId || "";
    this.districtId = data?.districtId || "";
    this.city = data?.city;
    this.district = data?.district;
  }

  static create(data?: SellerLocationRecordModel) {
    return new SellerLocation(data);
  }

  static fromFlat(data: SellerLocationRecordFlat) {
    const obj = new SellerLocation({
      sellerId: data.sellerId,
      cityId: data.cityId,
      districtId: data.districtId,
    });

    if (data["city.id"]) {
      obj.city = new City({
        id: data["city.id"],
        name: toOptional(data["city.name"]),
      });
    }

    if (data["district.id"]) {
      obj.district = new District({
        id: data["district.id"],
        name: toOptional(data["district.name"]),
      });
    }

    return obj;
  }
}

export class SellerLocationInsert implements SellerLocationInsertModel {
  sellerId: number;
  cityId: string;
  districtId: string;

  constructor(data?: Partial<SellerLocationInsertModel>) {
    this.sellerId = data?.sellerId || 0;
    this.cityId = data?.cityId || "";
    this.districtId = data?.districtId || "";
  }

  static create(data?: SellerLocationInsertModel) {
    return new SellerLocationInsert(data);
  }
}
