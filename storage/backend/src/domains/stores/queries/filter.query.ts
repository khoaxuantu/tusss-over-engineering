import { StoreLocationGetMapQuery } from "@/providers/stores-locations/queries/get-map.query";
import { StoreFilterRepository } from "@/providers/stores/repositories/store.repository";
import { IQueryHandler, Query, QueryBus, QueryHandler } from "@nestjs/cqrs";
import { Pagination, toOptional } from "@tusss/core";
import { PaginationResponse } from "@tusss/nestjs";
import { StoreFilterRequest } from "../dtos/request";
import { StoreFilterResponse, StoreResponse } from "../dtos/response";

export class StoreFilterQuery extends Query<StoreFilterResponse> {
  constructor(readonly body: StoreFilterRequest) {
    super();
  }
}

@QueryHandler(StoreFilterQuery)
export class StoreFilterQueryHandler implements IQueryHandler<StoreFilterQuery> {
  constructor(
    private readonly filter: StoreFilterRepository,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(query: StoreFilterQuery): Promise<StoreFilterResponse> {
    const qb = this.filter.newQb();

    const res = await this.filter.paginate(
      qb,
      new Pagination({ page: query.body.page, perPage: query.body.perPage }),
      [],
    );

    const storeIds = res.data.map((item) => item.id);
    const storeLocations = await this.queryBus.execute(new StoreLocationGetMapQuery(storeIds));

    return new StoreFilterResponse({
      data: res.data.map((data) => {
        const location = storeLocations.get(data.id);

        return new StoreResponse({
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
