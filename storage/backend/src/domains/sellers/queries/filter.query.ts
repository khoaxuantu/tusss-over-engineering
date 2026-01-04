import { SellerLocationGetMapQuery } from "@/providers/sellers-locations/queries/get-map.query";
import { SellerFilterRepository } from "@/providers/sellers/repositories/seller.repository";
import { IQueryHandler, Query, QueryBus, QueryHandler } from "@nestjs/cqrs";
import { Pagination, toOptional } from "@tusss/core";
import { PaginationResponse } from "@tusss/nestjs";
import { SellerFilterRequest } from "../dtos/request";
import { SellerFilterResponse, SellerResponse } from "../dtos/response";

export class SellerFilterQuery extends Query<SellerFilterResponse> {
  constructor(readonly body: SellerFilterRequest) {
    super();
  }
}

@QueryHandler(SellerFilterQuery)
export class SellerFilterQueryHandler implements IQueryHandler<SellerFilterQuery> {
  constructor(
    private readonly filter: SellerFilterRepository,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(query: SellerFilterQuery): Promise<SellerFilterResponse> {
    const qb = this.filter.newQb();

    const res = await this.filter.paginate(
      qb,
      new Pagination({ page: query.body.page, perPage: query.body.perPage }),
      [],
    );

    const sellerIds = res.data.map((item) => item.id);
    const sellerLocations = await this.queryBus.execute(new SellerLocationGetMapQuery(sellerIds));

    return new SellerFilterResponse({
      data: res.data.map((data) => {
        const location = sellerLocations.get(data.id);

        return new SellerResponse({
          id: data.id,
          name: data.name,
          type: data.type,
          href: toOptional(data.href),
          city: location?.city,
          district: location?.district,
        });
      }),
      pagination: PaginationResponse.fromModel(res.pagination),
    });
  }
}
