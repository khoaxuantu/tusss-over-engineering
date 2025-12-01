import { InjectDbClient } from "@/db/decorators/inject-client.decorator";
import type { DbClient } from "@/db/modules/types";
import { ReadRepository, WriteRepository } from "@/shared/repos/abstracts/repository.abstract";
import { UpdateObjBuilder } from "@/shared/repos/abstracts/updater.abstract";
import { HasPrimaryKey } from "@/shared/repos/types";
import { Injectable } from "@nestjs/common";
import { Item, ItemInsertModel } from "../models/item.model";
import { ItemUpdateObjBuilder } from "./builders/update-obj.builder";

@Injectable()
export class ItemWriteRepository extends WriteRepository<Item, "items"> {
  constructor(
    @InjectDbClient()
    db: DbClient,
  ) {
    super(db);
  }

  get updater() {
    return new ItemUpdateObjBuilder();
  }

  override async insertOne(data: ItemInsertModel): Promise<HasPrimaryKey | undefined> {
    const res = await this.db.insertInto("items").values(data).returning("id").executeTakeFirst();
    return res;
  }

  override async insertMany(data: ItemInsertModel[]): Promise<number[]> {
    const res = await this.db.insertInto("items").values(data).returning("id").execute();
    return res.map((r) => r.id);
  }

  override async update(id: number, builder: UpdateObjBuilder): Promise<boolean> {
    const data = builder.build();
    const res = await this.db
      .updateTable("items")
      .set(data)
      .where("id", "=", id)
      .executeTakeFirst();
    return res.numUpdatedRows > 0;
  }

  override async updateAndReturn(
    id: number,
    builder: ItemUpdateObjBuilder,
  ): Promise<Item | undefined> {
    const data = builder.build();
    const res = await this.db
      .updateTable("items")
      .set(data)
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirst();
    if (!res) return undefined;
    return Item.create(res);
  }

  override async delete(id: number): Promise<boolean> {
    const res = await this.db.deleteFrom("items").where("id", "=", id).executeTakeFirst();
    return res.numDeletedRows > 0;
  }
}

@Injectable()
export class ItemReadRepository extends ReadRepository<Item> {
  constructor(
    @InjectDbClient()
    db: DbClient,
  ) {
    super(db);
  }

  override get selectQuery() {
    return this.db.selectFrom("items");
  }

  override async findById(id: number): Promise<Item | undefined> {
    const raw = await super.findById(id);
    if (!raw) return undefined;
    return Item.create(raw);
  }
}

@Injectable()
export class ItemRepository {
  constructor(
    readonly write: ItemWriteRepository,
    readonly read: ItemReadRepository,
  ) {}
}
