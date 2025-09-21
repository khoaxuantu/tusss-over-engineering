import { DbClientProvider, TableName } from "@/db/modules/constants";
import type { DbClient } from "@/db/modules/types";
import { TusssDb, UserTable } from "@/db/types/schemas.auto";
import { ReadRepository, WriteRepository } from "@/shared/repos/abstracts/repository.abstract";
import { TokenService } from "@/shared/tokens/services/token.service";
import { Inject, Injectable } from "@nestjs/common";
import { Insertable, UpdateQueryBuilder, UpdateResult } from "kysely";
import { User } from "../schemas/user.schema";

@Injectable()
export class UserReadRepository extends ReadRepository<User> {
  constructor(
    @Inject(DbClientProvider)
    db: DbClient,
  ) {
    super(db);
  }

  override get selectQuery() {
    return this.db.selectFrom("users");
  }

  override async findById(id: number): Promise<User | undefined> {
    const raw = await super.findById(id);
    if (!raw) return undefined;
    return User.create(raw);
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
export class UserWriteRepository extends WriteRepository<User> {
  constructor(
    @Inject(DbClientProvider)
    db: DbClient,
    private token: TokenService,
  ) {
    super(db);
  }

  get insertQuery() {
    return this.db.insertInto(TableName.users);
  }

  get updateQuery() {
    return this.db.updateTable(TableName.users);
  }

  get deleteQuery() {
    return this.db.deleteFrom(TableName.users);
  }

  override async insertOne(data: Insertable<UserTable>): Promise<{ id: number } | undefined> {
    data.password = await this.token.password.hash(data.password);
    const res = await super.insertOne(data);
    return res;
  }

  override async insertMany(data: Insertable<UserTable>[]): Promise<{ id: number }[]> {
    for (const input of data) {
      input.password = await this.token.password.hash(input.password);
    }

    return await super.insertMany(data);
  }

  override async updateAndReturn(
    id: number,
    query: UpdateQueryBuilder<TusssDb, "users", "users", UpdateResult>,
  ): Promise<User | undefined> {
    const raw = await super.updateAndReturn(id, query);
    if (!raw) return undefined;
    return User.create(raw);
  }
}

@Injectable()
export class UserRepository {
  constructor(
    public readonly read: UserReadRepository,
    public readonly write: UserWriteRepository,
  ) {}
}
