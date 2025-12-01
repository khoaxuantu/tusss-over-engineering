import { InjectDbClient } from "@/db/decorators/inject-client.decorator";
import type { DbClient } from "@/db/modules/types";
import { TusssDb } from "@/db/types/schemas.auto";
import { Pagination, PaginationResult } from "@/shared/models/pagination.model";
import { Sort } from "@/shared/models/sort.model";
import { InsertPlugin } from "@/shared/repos/abstracts/repository.abstract";
import { PaginationHelper } from "@/shared/repos/helpers/pagination.helper";
import { HasPrimaryKey } from "@/shared/repos/types";
import { Injectable } from "@nestjs/common";
import { InsertObject, SelectQueryBuilder } from "kysely";
import { City } from "./city.model";

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

@Injectable()
export class CityReadRepository {
  constructor(
    @InjectDbClient()
    private db: DbClient,
    private paginationHelper: PaginationHelper,
  ) {}

  get selectQuery() {
    return this.db.selectFrom("cities");
  }

  async findById(id: string) {
    const res = await this.db
      .selectFrom("cities")
      .where("id", "=", id)
      .selectAll()
      .executeTakeFirst();
    return res;
  }

  async paginate(
    query: SelectQueryBuilder<TusssDb, "cities", City>,
    pagination: Pagination,
    sorts: Sort<keyof City>[] = [],
  ) {
    const total = await this.paginationHelper.count(query);
    const data = await this.paginationHelper.fetch(query, pagination, sorts);

    return { data, pagination: new PaginationResult(pagination, total) };
  }
}
