import { CityRecordModel } from "@/domains/locations/cities/city.model";
import { DistrictRecordModel } from "@/domains/locations/districts/district.model";
import { SellerLocationTable } from "@/shared/db/types/schemas.auto";
import { Insertable, Selectable } from "kysely";

export type SellerLocationInsertModel = Insertable<SellerLocationTable>;
export type SellerLocationRecordModel = Selectable<SellerLocationTable> & {
  city?: CityRecordModel;
  district?: DistrictRecordModel;
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
