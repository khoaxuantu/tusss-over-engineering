import { DbClientProvider, TableName } from "@/db/modules/constants";
import type { DbClient } from "@/db/modules/types";
import { AdminTable, TusssDb } from "@/db/types/schemas.auto";
import { ReadRepository, WriteRepository } from "@/shared/repos/abstracts/repository.abstract";
import { TokenService } from "@/shared/tokens/services/token.service";
import { Inject, Injectable } from "@nestjs/common";
import { Insertable, UpdateQueryBuilder, UpdateResult } from "kysely";
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

  async getPassword(name: string) {
    const raw = await this.selectQuery
      .where("name", "is", name)
      .select(["id", "password"])
      .executeTakeFirst();
    if (!raw) return undefined;
    return raw;
  }
}

@Injectable()
export class AdminWriteRepository extends WriteRepository<Admin> {
  constructor(
    @Inject(DbClientProvider)
    db: DbClient,
    private token: TokenService,
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

  override async insertOne(data: Insertable<AdminTable>): Promise<{ id: number } | undefined> {
    data.password = await this.token.password.hash(data.password);
    const res = await super.insertOne(data);
    return res;
  }

  override async insertMany(data: Insertable<AdminTable>[]): Promise<{ id: number }[]> {
    for (const input of data) {
      input.password = await this.token.password.hash(input.password);
    }

    return await super.insertMany(data);
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
