import { Db } from "@/db/modules/types";
import { PaginationResponse } from "@/shared/dtos/response";
import { Pagination } from "@/shared/models/pagination.model";
import { FilterToEbAdapter } from "@/shared/repos/adapters/filter-to-eb.adapter";
import { IQueryHandler, Query, QueryHandler } from "@nestjs/cqrs";
import { expressionBuilder } from "kysely";
import { DistrictReadRepository } from "../district.repository";
import { DistrictFilterRequest } from "../dtos/request";
import { DistrictFilterResponse, DistrictResponse } from "../dtos/response";

export class DistrictFilterQuery extends Query<DistrictFilterResponse> {
  constructor(readonly body: DistrictFilterRequest) {
    super();
  }
}

@QueryHandler(DistrictFilterQuery)
export class DistrictFilterQueryHandler implements IQueryHandler<DistrictFilterQuery> {
  constructor(private readonly repository: DistrictReadRepository) {}

  async execute(query: DistrictFilterQuery): Promise<DistrictFilterResponse> {
    let q = this.repository.selectQuery;
    const eb = expressionBuilder<Db, "districts">();

    query.body.and?.forEach((filter) => {
      if (filter.id) q = q.where(FilterToEbAdapter.forString(eb.ref("id"), filter.id));
      if (filter.name) q = q.where(FilterToEbAdapter.forString(eb.ref("name"), filter.name));
    });

    const res = await this.repository.paginate(
      q,
      new Pagination({
        page: query.body.page,
        perPage: query.body.perPage,
      }),
    );

    return new DistrictFilterResponse({
      data: res.data.map((district) => new DistrictResponse(district)),
      pagination: PaginationResponse.fromModel(res.pagination),
    });
  }
}
