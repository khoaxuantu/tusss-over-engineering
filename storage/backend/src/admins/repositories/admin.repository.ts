import { DbClientProvider, TableName } from "@/db/modules/constants";
import type { DbClient } from "@/db/modules/types";
import { TusssDb } from "@/db/types/schemas.auto";
import { ReadRepository, WriteRepository } from "@/shared/repos/abstracts/repository.abstract";
import { Inject, Injectable } from "@nestjs/common";
import { UpdateQueryBuilder, UpdateResult } from "kysely";
import { Admin } from "../schemas/admin.schema";

@Injectable()
export class AdminReadRepository extends ReadRepository<Admin> {
  constructor(
    @Inject(DbClientProvider)
    db: DbClient,
  ) {
    super(db);
  }

  override get selectQuery() {
    return this.db.selectFrom("admins");
  }

  override async findById(id: number): Promise<Admin | undefined> {
    const raw = await super.findById(id);
    if (!raw) return undefined;
    return Admin.create(raw);
  }
}

@Injectable()
export class AdminWriteRepository extends WriteRepository<Admin> {
  constructor(
    @Inject(DbClientProvider)
    db: DbClient,
  ) {
    super(db);
  }

  get insertQuery() {
    return this.db.insertInto(TableName.admins);
  }

  get updateQuery() {
    return this.db.updateTable(TableName.admins);
  }

  get deleteQuery() {
    return this.db.deleteFrom(TableName.admins);
  }

  override async updateAndReturn(
    id: number,
    query: UpdateQueryBuilder<TusssDb, "admins", "admins", UpdateResult>,
  ): Promise<Admin | undefined> {
    const raw = await super.updateAndReturn(id, query);
    if (!raw) return undefined;
    return Admin.create(raw);
  }
}

@Injectable()
export class AdminRepository {
  constructor(
    public readonly read: AdminReadRepository,
    public readonly write: AdminWriteRepository,
  ) {}
}
