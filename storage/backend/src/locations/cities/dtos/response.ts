import { PaginationResponse } from "@/shared/dtos/response";
import { ApiProperty } from "@nestjs/swagger";

export class CityCreateResponse {
  @ApiProperty()
  new_id: string;

  constructor(data?: Partial<CityCreateResponse>) {
    this.new_id = data?.new_id ?? "";
  }
}

export class CityResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  constructor(data?: Partial<CityResponse>) {
    this.id = data?.id ?? "";
    this.name = data?.name ?? "";
  }
}

export class CityFilterResponse {
  data: CityResponse[];
  pagination: PaginationResponse;

  constructor(data?: Partial<CityFilterResponse>) {
    this.data = data?.data ?? [];
    this.pagination = data?.pagination ?? new PaginationResponse();
  }
}
