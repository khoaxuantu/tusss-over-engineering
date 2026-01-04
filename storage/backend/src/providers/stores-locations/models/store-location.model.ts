import { City, CityRecordModel } from "@/domains/locations/cities/city.model";
import { District, DistrictRecordModel } from "@/domains/locations/districts/district.model";
import { StoreLocationTable } from "@/shared/db/types/schemas.auto";
import { toOptional } from "@tusss/core";
import { Insertable, Selectable } from "kysely";

export type StoreLocationInsertModel = Insertable<StoreLocationTable>;
export type StoreLocationRecordModel = Selectable<StoreLocationTable> & {
  city?: CityRecordModel;
  district?: DistrictRecordModel;
};
export type StoreLocationRecordFlat = Selectable<StoreLocationTable> & {
  "city.id": string | null;
  "city.name": string | null;
  "district.id": string | null;
  "district.name": string | null;
};

export class StoreLocation implements StoreLocationRecordModel {
  storeId: number;
  cityId: string;
  districtId: string;

  city?: CityRecordModel;
  district?: DistrictRecordModel;

  constructor(data?: Partial<StoreLocationRecordModel>) {
    this.storeId = data?.storeId ?? 0;
    this.cityId = data?.cityId || "";
    this.districtId = data?.districtId || "";
    this.city = data?.city;
    this.district = data?.district;
  }

  static create(data?: StoreLocationRecordModel) {
    return new StoreLocation(data);
  }

  static fromFlat(data: StoreLocationRecordFlat) {
    const obj = new StoreLocation({
      storeId: data.storeId,
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

export class StoreLocationInsert implements StoreLocationInsertModel {
  storeId: number;
  cityId: string;
  districtId: string;

  constructor(data?: Partial<StoreLocationInsertModel>) {
    this.storeId = data?.storeId ?? 0;
    this.cityId = data?.cityId || "";
    this.districtId = data?.districtId || "";
  }

  static create(data?: StoreLocationInsertModel) {
    return new StoreLocationInsert(data);
  }
}
