import { InjectDbClient } from "@/shared/db/decorators/inject-client.decorator";
import type { Db, DbClient } from "@/shared/db/modules/types";
import { ReadRepository, WriteRepository } from "@/shared/repos/abstracts/repository.abstract";
import { UpdateObjBuilder } from "@/shared/repos/abstracts/updater.abstract";
import { PaginationHelper } from "@/shared/repos/helpers/pagination.helper";
import { HasPrimaryKey } from "@/shared/repos/types";
import { Injectable } from "@nestjs/common";
import { Paginable, Pagination, PaginationResult, Sort } from "@tusss/core";
import { expressionBuilder, InsertObject, SelectQueryBuilder } from "kysely";
import { Store } from "../models/store.model";
import { StoreUpdateBuilder } from "./builders/update-obj.builder";

@Injectable()
export class StoreWriteRepository extends WriteRepository<Store, "stores"> {
  constructor(
    @InjectDbClient()
    db: DbClient,
  ) {
    super(db);
  }

  get updater() {
    return new StoreUpdateBuilder();
  }

  override async insertOne(data: InsertObject<Db, "stores">): Promise<HasPrimaryKey | undefined> {
    const res = await this.db.insertInto("stores").values(data).returning("id").executeTakeFirst();
    return res;
  }

  override async insertMany(data: InsertObject<Db, "stores">[]): Promise<number[]> {
    const res = await this.db.insertInto("stores").values(data).returning("id").execute();
    return res.map((r) => r.id);
  }

  override async update(id: number, builder: UpdateObjBuilder): Promise<boolean> {
    const data = builder.build();
    const res = await this.db
      .updateTable("stores")
      .set(data)
      .where("id", "=", id)
      .executeTakeFirst();
    return res.numUpdatedRows > 0;
  }

  override async updateAndReturn(
    id: number,
    builder: UpdateObjBuilder,
  ): Promise<Store | undefined> {
    const data = builder.build();
    const res = await this.db
      .updateTable("stores")
      .set(data)
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirst();
    if (!res) return undefined;
    return new Store(res);
  }

  override async delete(id: number): Promise<boolean> {
    const res = await this.db.deleteFrom("stores").where("id", "=", id).executeTakeFirst();
    return res.numDeletedRows > 0;
  }
}

@Injectable()
export class StoreReadRepository extends ReadRepository<Store> {
  constructor(
    @InjectDbClient()
    db: DbClient,
  ) {
    super(db);
  }

  override get selectQuery() {
    return this.db.selectFrom("stores");
  }

  override async findById(id: number): Promise<Store | undefined> {
    const raw = await super.findById(id);
    if (!raw) return undefined;
    return new Store(raw);
  }
}

@Injectable()
export class StoreFilterRepository {
  constructor(
    @InjectDbClient()
    private readonly db: DbClient,
    private readonly pagination: PaginationHelper,
  ) {}

  newQb() {
    return this.db.selectFrom("stores");
  }

  newEb() {
    return expressionBuilder<Db, "stores">();
  }

  async paginate(
    query: SelectQueryBuilder<Db, "stores", {}>,
    pagination: Pagination,
    sorts: Sort[],
  ) {
    const total = await this.pagination.count(query);
    const data = await this.pagination.fetch(query.selectAll(), pagination, sorts);
    return new Paginable(data, new PaginationResult(pagination, total));
  }
}

@Injectable()
export class StoreRepository {
  constructor(
    readonly write: StoreWriteRepository,
    readonly read: StoreReadRepository,
  ) {}
}
