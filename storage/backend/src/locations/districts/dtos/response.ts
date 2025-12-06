import { PaginationResponse } from "@/shared/dtos/response";
import { ApiProperty } from "@nestjs/swagger";

export class DistrictResponse {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  constructor(data?: Partial<DistrictResponse>) {
    this.id = data?.id ?? "";
    this.name = data?.name ?? "";
  }
}

export class DistrictFilterResponse {
  @ApiProperty({ type: [DistrictResponse] })
  data: DistrictResponse[];

  @ApiProperty({ type: PaginationResponse })
  pagination: PaginationResponse;

  constructor(data?: Partial<DistrictFilterResponse>) {
    this.data = data?.data ?? [];
    this.pagination = data?.pagination ?? new PaginationResponse();
  }
}
