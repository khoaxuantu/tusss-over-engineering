import { SellerLocationTable } from "@/db/types/schemas.auto";
import { Insertable, Selectable } from "kysely";

export type SellerLocationInsertModel = Insertable<SellerLocationTable>;
export type SellerLocationRecordModel = Selectable<SellerLocationTable>;

export class SellerLocation implements SellerLocationRecordModel {
  sellerId: number;
  cityId: string;
  districtId: string;

  constructor(data?: Partial<SellerLocationRecordModel>) {
    this.sellerId = data?.sellerId || 0;
    this.cityId = data?.cityId || "";
    this.districtId = data?.districtId || "";
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
