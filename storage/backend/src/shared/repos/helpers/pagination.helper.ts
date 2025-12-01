import { TusssDb } from "@/db/types/schemas.auto";
import { Pagination } from "@/shared/models/pagination.model";
import { Sort } from "@/shared/models/sort.model";
import { Injectable } from "@nestjs/common";
import { SelectQueryBuilder } from "kysely";

@Injectable()
export class PaginationHelper {
  async count<TB extends keyof TusssDb, O>(query: SelectQueryBuilder<TusssDb, TB, O>) {
    const res = await query.select((eb) => eb.fn.countAll<number>().as("count")).executeTakeFirst();
    return res?.count || 0;
  }

  async fetch<TB extends keyof TusssDb, O extends Record<string, any>>(
    query: SelectQueryBuilder<TusssDb, TB, O>,
    pagination: Pagination,
    sorts: Sort<string>[],
  ) {
    query.offset(pagination.skip).limit(pagination.limit);
    sorts.forEach((sort) => {
      query.orderBy(sort.field, sort.direction);
    });

    return await query.execute();
  }
}
