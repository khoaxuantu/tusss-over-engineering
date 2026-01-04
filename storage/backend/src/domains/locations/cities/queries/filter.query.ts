import { Db } from "@/shared/db/modules/types";
import { PaginationResponse } from "@/shared/dtos/response";
import { Pagination } from "@/shared/models/pagination.model";
import { FilterToEbAdapter } from "@/shared/repos/adapters/filter-to-eb.adapter";
import { IQueryHandler, Query, QueryHandler } from "@nestjs/cqrs";
import { expressionBuilder } from "kysely";
import { CityReadRepository } from "../city.repository";
import { CityFilterRequest } from "../dtos/request";
import { CityFilterResponse, CityResponse } from "../dtos/response";

export class CityFilterQuery extends Query<CityFilterResponse> {
  constructor(readonly body: CityFilterRequest) {
    super();
  }
}

@QueryHandler(CityFilterQuery)
export class CityFilterQueryHandler implements IQueryHandler<CityFilterQuery> {
  constructor(private reader: CityReadRepository) {}

  async execute(query: CityFilterQuery) {
    let q = this.reader.selectQuery;
    const eb = expressionBuilder<Db, "cities">();

    query.body.and?.forEach((filter) => {
      if (filter.id) q = q.where(FilterToEbAdapter.forString(eb.ref("id"), filter.id));
      if (filter.name) q = q.where(FilterToEbAdapter.forString(eb.ref("name"), filter.name));
    });

    const res = await this.reader.paginate(
      q,
      new Pagination({ page: query.body.page, perPage: query.body.perPage }),
      query.body.sorts,
    );

    return new CityFilterResponse({
      data: res.data.map((city) => new CityResponse(city)),
      pagination: PaginationResponse.fromModel(res.pagination),
    });
  }
}
