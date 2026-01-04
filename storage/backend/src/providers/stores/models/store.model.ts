import { StoreType } from "@/shared/db/types/enums.auto";
import { StoreTable } from "@/shared/db/types/schemas.auto";
import { Insertable, Selectable, Updateable } from "kysely";

export type StoreRecordModel = Selectable<StoreTable>;
export type StoreUpdateModel = Updateable<StoreTable>;
export type StoreInsertModel = Insertable<StoreTable>;

export class Store implements StoreRecordModel {
  id: number;
  name: string;
  type: StoreType;
  href: string | null = null;

  constructor(data?: Partial<StoreRecordModel>) {
    this.id = data?.id ?? 0;
    this.name = data?.name ?? "";
    this.type = data?.type ?? StoreType.AUTH;
    this.href = data?.href ?? null;
  }

  static create(data?: StoreRecordModel) {
    return new Store(data);
  }
}

export class StoreInsert implements StoreInsertModel {
  id?: number;
  name: string;
  type: StoreType;
  href?: string | null;

  constructor(data?: Partial<StoreInsertModel>) {
    this.id = data?.id;
    this.name = data?.name || "";
    this.type = data?.type || StoreType.AUTH;
    this.href = data?.href;
  }

  static create(data?: StoreInsertModel) {
    return new StoreInsert(data);
  }
}
