import { CityResponse } from "@/domains/locations/cities/dtos/response";
import { DistrictResponse } from "@/domains/locations/districts/dtos/response";
import { StoreType } from "@/shared/db/types/enums.auto";
import { ApiProperty, IntersectionType, PickType } from "@nestjs/swagger";
import { PaginationResponse, ResourceDetailResponse } from "@tusss/nestjs";
import { StoreCreateRequest } from "./request";

export class StoreResponse extends IntersectionType(
  ResourceDetailResponse,
  PickType(StoreCreateRequest, ["name", "type", "href"]),
) {
  @ApiProperty()
  city: CityResponse;

  @ApiProperty()
  district: DistrictResponse;

  constructor(data?: Partial<StoreResponse>) {
    super();

    this.id = data?.id || 0;
    this.name = data?.name || "";
    this.type = data?.type || StoreType.AUTH;
    this.href = data?.href || "";
    this.city = data?.city || new CityResponse();
    this.district = data?.district || new DistrictResponse();
  }
}

export class StoreFilterResponse {
  @ApiProperty({ type: [StoreResponse] })
  data: StoreResponse[];

  @ApiProperty({ type: PaginationResponse })
  pagination: PaginationResponse;

  constructor(data?: Partial<StoreFilterResponse>) {
    this.data = data?.data || [];
    this.pagination = data?.pagination ?? new PaginationResponse();
  }
}
