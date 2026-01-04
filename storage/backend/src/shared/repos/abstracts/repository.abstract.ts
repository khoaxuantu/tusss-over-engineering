import type { Db, DbClient, DbTable } from "@/shared/db/modules/types";
import { InsertObject, SelectQueryBuilder } from "kysely";
import { HasPrimaryKey, Id } from "../types";
import { UpdateObjBuilder } from "./updater.abstract";

type SelectQuery = SelectQueryBuilder<Db, DbTable, any>;

/**
 * This interface provide a guideline to implement insertable repositories. It contains 2 actions,
 * inserting single record, and inserting multiple records.
 */
export interface InsertPlugin<TBK extends DbTable, TID extends Id = number> {
  insertOne(data: InsertObject<Db, TBK>): Promise<HasPrimaryKey<TID> | undefined>;
  insertMany(data: InsertObject<Db, TBK>[]): Promise<TID[]>;
}

/**
 * This interface provide a guideline to implement updatable repositories. There are 2 common cases
 * of updating that a repository has to cover: Update a record only or update then return the
 * updated record.
 *
 * The interface would not provide an update multiple reocords method, since there might be a lot of
 * cases with different inputs that the method has to cover.
 */
export interface UpdatePlugin<O, TID extends Id = number> {
  update(id: TID, builder: UpdateObjBuilder): Promise<boolean>;
  updateAndReturn(id: TID, builder: UpdateObjBuilder): Promise<O | undefined>;
}

/**
 * This interface provide a guideline to implement deletable repositories. The most common case of
 * deleting an record is deleting by id.
 *
 * Because many join tables may not contain the primary key, the interface is only suitable to
 * entity tables, whose records are identified by a primary key.
 */
export interface DeletePlugin<TID extends Id = number> {
  delete(id: TID): Promise<boolean>;
}

/**
 * Some entity tables provide soft delete methods, in which we mark a record to be true in delete
 * column instead of delete the record completely out of the table.
 *
 * This interface provide a guideline to implement soft delete plugin in repositories.
 */
export interface SoftDeletePlugin<TID extends Id = number> {
  deleteSoft(id: TID): Promise<boolean>;
}

export abstract class WriteRepository<
  T extends HasPrimaryKey<TID>,
  TBK extends DbTable = DbTable,
  TID extends Id = number,
>
  implements InsertPlugin<TBK, TID>, UpdatePlugin<T, TID>, DeletePlugin<TID>
{
  constructor(readonly db: DbClient) {}

  abstract get updater(): UpdateObjBuilder;

  get transaction() {
    return this.db.transaction();
  }

  abstract insertOne(data: InsertObject<Db, TBK>): Promise<HasPrimaryKey<TID> | undefined>;
  abstract insertMany(data: InsertObject<Db, TBK>[]): Promise<TID[]>;
  abstract update(id: TID, builder: UpdateObjBuilder): Promise<boolean>;
  abstract updateAndReturn(id: TID, builder: UpdateObjBuilder): Promise<T | undefined>;
  abstract delete(id: TID): Promise<boolean>;
}

export abstract class ReadRepository<T extends HasPrimaryKey<TID>, TID extends Id = number> {
  constructor(readonly db: DbClient) {}

  abstract get selectQuery(): SelectQuery;

  async findById(id: TID): Promise<T | undefined> {
    const res = (await this.selectQuery.where("id", "=", id).selectAll().executeTakeFirst()) as
      | T
      | undefined;
    return res;
  }
}

export abstract class JoinTableRepository<TBK extends DbTable> implements InsertPlugin<TBK> {
  constructor(readonly db: DbClient) {}

  abstract insertOne(data: InsertObject<Db, TBK>): Promise<HasPrimaryKey | undefined>;
  abstract insertMany(data: InsertObject<Db, TBK>[]): Promise<number[]>;
}
