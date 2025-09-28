import type { DbClient } from "@/db/modules/types";
import { TusssDb } from "@/db/types/schemas.auto";
import { InsertObject, SelectQueryBuilder } from "kysely";
import { HasPrimaryKey } from "../types";
import { UpdateObjBuilder } from "./updater.abstract";

type SelectQuery = SelectQueryBuilder<TusssDb, keyof TusssDb, any>;

/**
 * This interface provide a guideline to implement insertable repositories. It contains 2 actions,
 * inserting single record, and inserting multiple records.
 */
export interface InsertPlugin<TBK extends keyof TusssDb> {
  insertOne(data: InsertObject<TusssDb, TBK>): Promise<HasPrimaryKey | undefined>;
  insertMany(data: InsertObject<TusssDb, TBK>[]): Promise<number[]>;
}

/**
 * This interface provide a guideline to implement updatable repositories. There are 2 common cases
 * of updating that a repository has to cover: Update a record only or update then return the
 * updated record.
 *
 * The interface would not provide an update multiple reocords method, since there might be a lot of
 * cases with different inputs that the method has to cover.
 */
export interface UpdatePlugin<O> {
  update(id: number, builder: UpdateObjBuilder): Promise<boolean>;
  updateAndReturn(id: number, builder: UpdateObjBuilder): Promise<O | undefined>;
}

/**
 * This interface provide a guideline to implement deletable repositories. The most common case of
 * deleting an record is deleting by id.
 *
 * Because many join tables may not contain the primary key, the interface is only suitable to
 * entity tables, whose records are identified by a primary key.
 */
export interface DeletePlugin {
  delete(id: number): Promise<boolean>;
}

/**
 * Some entity tables provide soft delete methods, in which we mark a record to be true in delete
 * column instead of delete the record completely out of the table.
 *
 * This interface provide a guideline to implement soft delete plugin in repositories.
 */
export interface SoftDeletePlugin {
  deleteSoft(id: number): Promise<boolean>;
}

export abstract class WriteRepository<
    T extends HasPrimaryKey,
    TBK extends keyof TusssDb = keyof TusssDb,
  >
  implements InsertPlugin<TBK>, UpdatePlugin<T>, DeletePlugin
{
  constructor(readonly db: DbClient) {}

  abstract get updater(): UpdateObjBuilder;

  get transaction() {
    return this.db.transaction();
  }

  abstract insertOne(data: InsertObject<TusssDb, TBK>): Promise<HasPrimaryKey | undefined>;
  abstract insertMany(data: InsertObject<TusssDb, TBK>[]): Promise<number[]>;
  abstract update(id: number, builder: UpdateObjBuilder): Promise<boolean>;
  abstract updateAndReturn(id: number, builder: UpdateObjBuilder): Promise<T | undefined>;
  abstract delete(id: number): Promise<boolean>;
}

export abstract class ReadRepository<T extends HasPrimaryKey> {
  constructor(readonly db: DbClient) {}

  abstract get selectQuery(): SelectQuery;

  async findById(id: number): Promise<T | undefined> {
    const res = (await this.selectQuery.where("id", "=", id).selectAll().executeTakeFirst()) as
      | T
      | undefined;
    return res;
  }
}

export abstract class JoinTableRepository<TBK extends keyof TusssDb> implements InsertPlugin<TBK> {
  constructor(readonly db: DbClient) {}

  abstract insertOne(data: InsertObject<TusssDb, TBK>): Promise<HasPrimaryKey | undefined>;
  abstract insertMany(data: InsertObject<TusssDb, TBK>[]): Promise<number[]>;
}
