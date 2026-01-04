import { CityResponse } from "@/domains/locations/cities/dtos/response";
import { DistrictResponse } from "@/domains/locations/districts/dtos/response";
import { StoreLocationGetOneQuery } from "@/providers/stores-locations/queries/get-one.query";
import { StoreReadRepository } from "@/providers/stores/repositories/store.repository";
import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, Query, QueryBus, QueryHandler } from "@nestjs/cqrs";
import { CommonMessage, toOptional } from "@tusss/core";
import { StoreResponse } from "../dtos/response";

export class StoreGetOneQuery extends Query<StoreResponse> {
  constructor(readonly id: number) {
    super();
  }
}

@QueryHandler(StoreGetOneQuery)
export class StoreGetOneQueryHandler implements IQueryHandler<StoreGetOneQuery> {
  constructor(
    private readonly storeReader: StoreReadRepository,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(query: StoreGetOneQuery): Promise<StoreResponse> {
    const store = await this.storeReader.findById(query.id);
    if (!store) throw new NotFoundException(CommonMessage.error.notFound);

    const storeLocation = await this.queryBus.execute(new StoreLocationGetOneQuery(query.id));

    return new StoreResponse({
      id: store.id,
      name: store.name,
      type: store.type,
      href: toOptional(store.href),
      city: new CityResponse({
        id: storeLocation?.cityId,
        name: storeLocation?.city?.name,
      }),
      district: new DistrictResponse({
        id: storeLocation?.districtId,
        name: storeLocation?.district?.name,
      }),
    });
  }
}
