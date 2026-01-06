import { InjectDbClient } from "@/shared/db/decorators/inject-client.decorator";
import type { Db, DbClient } from "@/shared/db/modules/types";
import { Paginable, Pagination, PaginationResult } from "@/shared/models/pagination.model";
import { Sort } from "@/shared/models/sort.model";
import { PaginationHelper } from "@/shared/repos/helpers/pagination.helper";
import { Injectable } from "@nestjs/common";
import { SelectQueryBuilder } from "kysely";
import { District, DistrictInsert } from "./district.model";

@Injectable()
export class DistrictWriteRepository {
  constructor(
    @InjectDbClient()
    private readonly db: DbClient,
  ) {}

  async insertOne(data: DistrictInsert) {
    return this.db.insertInto("districts").values(data).returning("id").executeTakeFirst();
  }

  async insertMany(data: DistrictInsert[]) {
    return this.db.insertInto("districts").values(data).returning("id").execute();
  }
}

@Injectable()
export class DistrictReadRepository {
  constructor(
    @InjectDbClient()
    private readonly db: DbClient,
    private paginationHelper: PaginationHelper,
  ) {}

  get selectQuery() {
    return this.db.selectFrom("districts");
  }

  async findById(id: string) {
    const res = await this.selectQuery.where("id", "=", id).selectAll().executeTakeFirst();
    return res;
  }

  async paginate(
    query: SelectQueryBuilder<Db, "districts", {}>,
    pagination: Pagination,
    sorts: Sort<keyof District>[] = [],
  ) {
    const total = await this.paginationHelper.count(query);
    const data = await this.paginationHelper.fetch(query.selectAll(), pagination, sorts);

    return new Paginable(data, new PaginationResult(pagination, total));
  }
}
