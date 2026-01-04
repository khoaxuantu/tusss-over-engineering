import { CityTable } from "@/shared/db/types/schemas.auto";
import { Insertable, Selectable } from "kysely";

export type CityRecordModel = Selectable<CityTable>;
export type CityInsertModel = Insertable<CityTable>;

export class City implements CityRecordModel {
  id: string;
  name: string;

  constructor(data?: Partial<CityRecordModel>) {
    this.id = data?.id ?? "";
    this.name = data?.name ?? "";
  }

  static create(data?: CityRecordModel) {
    return new City(data);
  }
}

export class CityInsert implements CityInsertModel {
  id: string;
  name: string;

  constructor(data?: Partial<CityInsertModel>) {
    this.id = data?.id ?? "";
    this.name = data?.name ?? "";
  }
}
