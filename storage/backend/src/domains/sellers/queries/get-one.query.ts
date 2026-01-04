import { CityResponse } from "@/domains/locations/cities/dtos/response";
import { DistrictResponse } from "@/domains/locations/districts/dtos/response";
import { SellerLocationGetOneQuery } from "@/providers/sellers-locations/queries/get-one.query";
import { SellerReadRepository } from "@/providers/sellers/repositories/seller.repository";
import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, Query, QueryBus, QueryHandler } from "@nestjs/cqrs";
import { CommonMessage, toOptional } from "@tusss/core";
import { SellerResponse } from "../dtos/response";

export class SellerGetOneQuery extends Query<SellerResponse> {
  constructor(readonly id: number) {
    super();
  }
}

@QueryHandler(SellerGetOneQuery)
export class SellerGetOneQueryHandler implements IQueryHandler<SellerGetOneQuery> {
  constructor(
    private readonly sellerReader: SellerReadRepository,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(query: SellerGetOneQuery): Promise<SellerResponse> {
    const seller = await this.sellerReader.findById(query.id);
    if (!seller) throw new NotFoundException(CommonMessage.error.notFound);

    const sellerLocation = await this.queryBus.execute(new SellerLocationGetOneQuery(query.id));

    return new SellerResponse({
      id: seller.id,
      name: seller.name,
      type: seller.type,
      href: toOptional(seller.href),
      city: new CityResponse({
        id: sellerLocation?.cityId,
        name: sellerLocation?.city?.name,
      }),
      district: new DistrictResponse({
        id: sellerLocation?.districtId,
        name: sellerLocation?.district?.name,
      }),
    });
  }
}
