import { DbClient } from "@/db/modules/types";
import { TusssDb } from "@/db/types/schemas.auto";
import {
  DeleteQueryBuilder,
  DeleteResult,
  InsertObject,
  InsertQueryBuilder,
  InsertResult,
  SelectQueryBuilder,
  UpdateQueryBuilder,
  UpdateResult,
} from "kysely";
import { UpdateObjBuilder } from "./updater.abstract";

type SelectQuery = SelectQueryBuilder<TusssDb, keyof TusssDb, any>;
type InsertQuery = InsertQueryBuilder<TusssDb, keyof TusssDb, InsertResult>;
type UpdateQuery = UpdateQueryBuilder<TusssDb, keyof TusssDb, keyof TusssDb, UpdateResult>;
type DeleteQuery = DeleteQueryBuilder<TusssDb, keyof TusssDb, DeleteResult>;

export abstract class WriteRepository<T> {
  constructor(readonly db: DbClient) {}

  abstract get insertQuery(): InsertQuery;
  abstract get updateQuery(): UpdateQuery;
  abstract get deleteQuery(): DeleteQuery;
  abstract get updater(): UpdateObjBuilder;

  get transaction() {
    return this.db.transaction();
  }

  async insertOne(data: InsertObject<TusssDb, keyof TusssDb>) {
    const res = await this.insertQuery.values(data).returning("id").executeTakeFirst();
    return res;
  }

  async insertMany(data: InsertObject<TusssDb, keyof TusssDb>[]) {
    const res = await this.insertQuery.values(data).returning("id").execute();
    return res;
  }

  async update(id: number, query: UpdateQuery, builder: UpdateObjBuilder): Promise<boolean> {
    const res = await query.set(builder.build()).where("id", "=", id).executeTakeFirst();
    return res.numUpdatedRows > 0;
  }

  async updateAndReturn(
    id: number,
    query: UpdateQuery,
    builder: UpdateObjBuilder,
  ): Promise<T | undefined> {
    const res = await query
      .set(builder.build())
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirst();
    return res as T | undefined;
  }

  async delete(id: number) {
    const res = await this.deleteQuery.where("id", "=", id).executeTakeFirst();
    return res;
  }

  async deleteMany(query: DeleteQuery) {
    const res = await query.execute();
    return res;
  }
}

export abstract class ReadRepository<T> {
  constructor(readonly db: DbClient) {}

  abstract get selectQuery(): SelectQuery;

  async findById(id: number): Promise<T | undefined> {
    const res = (await this.selectQuery.where("id", "=", id).selectAll().executeTakeFirst()) as
      | T
      | undefined;
    return res;
  }
}
