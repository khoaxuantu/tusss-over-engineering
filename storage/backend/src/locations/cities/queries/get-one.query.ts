import { CommonMessage } from "@/shared/constants";
import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, Query, QueryHandler } from "@nestjs/cqrs";
import { CityReadRepository } from "../city.repository";
import { CityResponse } from "../dtos/response";

export class CityGetOneQuery extends Query<CityResponse> {
  constructor(readonly id: string) {
    super();
  }
}

@QueryHandler(CityGetOneQuery)
export class CityGetOneQueryHandler implements IQueryHandler<CityGetOneQuery> {
  constructor(private cityReader: CityReadRepository) {}

  async execute(query: CityGetOneQuery): Promise<CityResponse> {
    const city = await this.cityReader.findById(query.id);
    if (!city) throw new NotFoundException(CommonMessage.error.notFound);
    return new CityResponse(city);
  }
}
