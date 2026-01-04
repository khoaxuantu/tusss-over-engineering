import { SellerType } from "@/shared/db/types/enums.auto";
import { SellerTable } from "@/shared/db/types/schemas.auto";
import { Insertable, Selectable, Updateable } from "kysely";

export type SellerRecordModel = Selectable<SellerTable>;
export type SellerUpdateModel = Updateable<SellerTable>;
export type SellerInsertModel = Insertable<SellerTable>;

export class Seller implements SellerRecordModel {
  id: number;
  name: string;
  type: SellerType;
  href: string | null = null;

  constructor(data?: Partial<SellerRecordModel>) {
    this.id = data?.id ?? 0;
    this.name = data?.name ?? "";
    this.type = data?.type ?? SellerType.AUTH;
    this.href = data?.href ?? null;
  }

  static create(data?: SellerRecordModel) {
    return new Seller(data);
  }
}

export class SellerInsert implements SellerInsertModel {
  id?: number;
  name: string;
  type: SellerType;
  href?: string | null;

  constructor(data?: Partial<SellerInsertModel>) {
    this.id = data?.id;
    this.name = data?.name || "";
    this.type = data?.type || SellerType.AUTH;
    this.href = data?.href;
  }

  static create(data?: SellerInsertModel) {
    return new SellerInsert(data);
  }
}
