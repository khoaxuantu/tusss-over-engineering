import { NotFoundException } from "@nestjs/common";
import { IQueryHandler, Query, QueryHandler } from "@nestjs/cqrs";
import { CommonMessage } from "@tusss/core";
import { DistrictReadRepository } from "../district.repository";
import { DistrictResponse } from "../dtos/response";

export class DistrictGetOneQuery extends Query<DistrictResponse> {
  constructor(readonly id: string) {
    super();
  }
}

@QueryHandler(DistrictGetOneQuery)
export class DistrictGetOneQueryHandler implements IQueryHandler<DistrictGetOneQuery> {
  constructor(private readonly repository: DistrictReadRepository) {}

  async execute(query: DistrictGetOneQuery): Promise<DistrictResponse> {
    const res = await this.repository.findById(query.id);
    if (!res) throw new NotFoundException(CommonMessage.error.notFound);

    return new DistrictResponse(res);
  }
}
