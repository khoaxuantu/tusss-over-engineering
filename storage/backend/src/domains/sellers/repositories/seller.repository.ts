import { InjectDbClient } from "@/db/decorators/inject-client.decorator";
import type { Db, DbClient } from "@/db/modules/types";
import { ReadRepository, WriteRepository } from "@/shared/repos/abstracts/repository.abstract";
import { UpdateObjBuilder } from "@/shared/repos/abstracts/updater.abstract";
import { HasPrimaryKey } from "@/shared/repos/types";
import { Injectable } from "@nestjs/common";
import { InsertObject } from "kysely";
import { Seller } from "../models/seller.model";
import { SellerUpdateBuilder } from "./builders/update-obj.builder";

@Injectable()
export class SellerWriteRepository extends WriteRepository<Seller, "sellers"> {
  constructor(
    @InjectDbClient()
    db: DbClient,
  ) {
    super(db);
  }

  get updater() {
    return new SellerUpdateBuilder();
  }

  override async insertOne(data: InsertObject<Db, "sellers">): Promise<HasPrimaryKey | undefined> {
    const res = await this.db.insertInto("sellers").values(data).returning("id").executeTakeFirst();
    return res;
  }

  override async insertMany(data: InsertObject<Db, "sellers">[]): Promise<number[]> {
    const res = await this.db.insertInto("sellers").values(data).returning("id").execute();
    return res.map((r) => r.id);
  }

  override async update(id: number, builder: UpdateObjBuilder): Promise<boolean> {
    const data = builder.build();
    const res = await this.db
      .updateTable("sellers")
      .set(data)
      .where("id", "=", id)
      .executeTakeFirst();
    return res.numUpdatedRows > 0;
  }

  override async updateAndReturn(
    id: number,
    builder: UpdateObjBuilder,
  ): Promise<Seller | undefined> {
    const data = builder.build();
    const res = await this.db
      .updateTable("sellers")
      .set(data)
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirst();
    if (!res) return undefined;
    return new Seller(res);
  }

  override async delete(id: number): Promise<boolean> {
    const res = await this.db.deleteFrom("sellers").where("id", "=", id).executeTakeFirst();
    return res.numDeletedRows > 0;
  }
}

@Injectable()
export class SellerReadRepository extends ReadRepository<Seller> {
  constructor(
    @InjectDbClient()
    db: DbClient,
  ) {
    super(db);
  }

  override get selectQuery() {
    return this.db.selectFrom("sellers");
  }

  override async findById(id: number): Promise<Seller | undefined> {
    const raw = await super.findById(id);
    if (!raw) return undefined;
    return new Seller(raw);
  }
}

@Injectable()
export class SellerRepository {
  constructor(
    readonly write: SellerWriteRepository,
    readonly read: SellerReadRepository,
  ) {}
}
