import { InjectDbClient } from "@/db/decorators/inject-client.decorator";
import type { DbClient } from "@/db/modules/types";
import { TusssDb } from "@/db/types/schemas.auto";
import { InsertPlugin } from "@/shared/repos/abstracts/repository.abstract";
import { HasPrimaryKey } from "@/shared/repos/types";
import { Injectable } from "@nestjs/common";
import { InsertObject } from "kysely";

@Injectable()
export class CityWriteRepository implements InsertPlugin<"cities", string> {
  constructor(
    @InjectDbClient()
    private db: DbClient,
  ) {}

  async insertOne(
    data: InsertObject<TusssDb, "cities">,
  ): Promise<HasPrimaryKey<string> | undefined> {
    const res = await this.db.insertInto("cities").values(data).returning("id").executeTakeFirst();
    return res;
  }

  async insertMany(data: InsertObject<TusssDb, "cities">[]): Promise<string[]> {
    const res = await this.db.insertInto("cities").values(data).returning("id").execute();
    return res.map((r) => r.id);
  }
}
