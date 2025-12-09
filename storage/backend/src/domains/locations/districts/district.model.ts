import { DistrictTable } from "@/db/types/schemas.auto";
import { Insertable, Selectable } from "kysely";

export type DistrictRecordModel = Selectable<DistrictTable>;
export type DistrictInsertModel = Insertable<DistrictTable>;

export class District implements DistrictRecordModel {
  id: string;
  name: string;

  constructor(data?: Partial<DistrictRecordModel>) {
    this.id = data?.id ?? "";
    this.name = data?.name ?? "";
  }

  static create(data?: DistrictRecordModel) {
    return new District(data);
  }
}

export class DistrictInsert implements DistrictInsertModel {
  id: string;
  name: string;

  constructor(data?: Partial<DistrictInsertModel>) {
    this.id = data?.id ?? "";
    this.name = data?.name ?? "";
  }

  static create(data?: DistrictInsertModel) {
    return new DistrictInsert(data);
  }
}
