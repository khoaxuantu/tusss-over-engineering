import { DistrictTable } from "@/db/types/schemas.auto";
import { Selectable } from "kysely";

export type DistrictRecordModel = Selectable<DistrictTable>;

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
