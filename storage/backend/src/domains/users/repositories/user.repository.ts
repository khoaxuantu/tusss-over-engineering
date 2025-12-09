import { DbClientProvider } from "@/db/modules/constants";
import type { DbClient } from "@/db/modules/types";
import { UserTable } from "@/db/types/schemas.auto";
import { ReadRepository, WriteRepository } from "@/shared/repos/abstracts/repository.abstract";
import { UpdateObjBuilder } from "@/shared/repos/abstracts/updater.abstract";
import { TokenService } from "@/shared/tokens/services/token.service";
import { Inject, Injectable } from "@nestjs/common";
import { Insertable } from "kysely";
import { User } from "../models/user.model";
import { UserUpdateObjBuilder } from "./builders/update-obj.builder";

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
      .where("name", "=", name)
      .select(["id", "password"])
      .executeTakeFirst();
    if (!raw) return undefined;
    return raw;
  }
}

@Injectable()
export class UserWriteRepository extends WriteRepository<User, "users"> {
  constructor(
    @Inject(DbClientProvider)
    db: DbClient,
    private token: TokenService,
  ) {
    super(db);
  }

  get updater() {
    return new UserUpdateObjBuilder(this.token);
  }

  override async insertOne(data: Insertable<UserTable>): Promise<{ id: number } | undefined> {
    data.password = await this.token.password.hash(data.password);
    const res = await this.db.insertInto("users").values(data).returning("id").executeTakeFirst();
    return res;
  }

  override async insertMany(data: Insertable<UserTable>[]) {
    for (const input of data) {
      input.password = await this.token.password.hash(input.password);
    }

    const users = await this.db.insertInto("users").values(data).returning("id").execute();
    return users.map((u) => u.id);
  }

  override async update(id: number, builder: UpdateObjBuilder): Promise<boolean> {
    const data = builder.build();
    const res = await this.db
      .updateTable("users")
      .set(data)
      .where("id", "=", id)
      .executeTakeFirst();
    return res.numUpdatedRows > 0;
  }

  override async updateAndReturn(
    id: number,
    builder: UserUpdateObjBuilder,
  ): Promise<User | undefined> {
    const data = builder.build();
    const res = await this.db
      .updateTable("users")
      .set(data)
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirst();
    if (!res) return undefined;
    return User.create(res);
  }

  override async delete(id: number): Promise<boolean> {
    const res = await this.db.deleteFrom("users").where("id", "=", id).executeTakeFirst();
    return res.numDeletedRows > 0;
  }
}

@Injectable()
export class UserRepository {
  constructor(
    public readonly read: UserReadRepository,
    public readonly write: UserWriteRepository,
  ) {}
}
