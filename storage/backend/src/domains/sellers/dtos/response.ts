import { CityResponse } from "@/domains/locations/cities/dtos/response";
import { DistrictResponse } from "@/domains/locations/districts/dtos/response";
import { SellerType } from "@/shared/db/types/enums.auto";
import { ApiProperty, IntersectionType, PickType } from "@nestjs/swagger";
import { ResourceDetailResponse } from "@tusss/nestjs";
import { SellerCreateRequest } from "./request";

export class SellerResponse extends IntersectionType(
  ResourceDetailResponse,
  PickType(SellerCreateRequest, ["name", "type", "href"]),
) {
  @ApiProperty()
  city: CityResponse;

  @ApiProperty()
  district: DistrictResponse;

  constructor(data?: Partial<SellerResponse>) {
    super();

    this.id = data?.id || 0;
    this.name = data?.name || "";
    this.type = data?.type || SellerType.AUTH;
    this.href = data?.href || "";
    this.city = data?.city || new CityResponse();
    this.district = data?.district || new DistrictResponse();
  }
}
