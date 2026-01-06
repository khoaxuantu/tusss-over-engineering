import { ItemTable } from "@/shared/db/types/schemas.auto";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { Insertable, Selectable, Updateable } from "kysely";

export type ItemRecordModel = Selectable<ItemTable>;
export type ItemInsertModel = Insertable<ItemTable>;
export type ItemUpdateModel = Updateable<ItemTable>;

export class ItemInsert implements ItemInsertModel {
  name: string = "";
  price = 0;
  retailerId = 0;
  brandId = 0;
  description?: string;
  href?: string;
  archived?: boolean;

  constructor(data?: ItemInsert) {
    Object.assign(this, data);
  }

  static create(data?: Partial<ItemInsert>) {
    return plainToInstance(ItemInsert, data || {}, {
      exposeDefaultValues: true,
    });
  }

  static toPlain(item: ItemInsert): ItemInsertModel {
    const obj = instanceToPlain(item);
    return obj as ItemInsertModel;
  }
}

export class Item implements ItemRecordModel {
  id = 0;
  name = "";
  price = 0;
  description: string | null = null;
  href: string | null = null;
  archived = false;
  retailerId = 0;
  brandId = 0;

  constructor(data?: Item) {
    Object.assign(this, data);
  }

  static create(data?: Updateable<ItemTable>) {
    return plainToInstance(Item, data || {}, {
      exposeDefaultValues: true,
    });
  }

  static toPlain(item: Item): ItemRecordModel {
    const obj = instanceToPlain(item);
    return obj as ItemRecordModel;
  }
}
