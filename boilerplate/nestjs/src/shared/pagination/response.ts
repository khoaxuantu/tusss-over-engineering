import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ClassProperties, PaginationResult } from "@tusss/ood";

export class PaginationResponse implements ClassProperties<PaginationResult> {
  @ApiProperty()
  page: number;

  @ApiProperty()
  perPage: number;

  @ApiPropertyOptional()
  nextPage?: number | undefined;

  @ApiPropertyOptional()
  prevPage?: number | undefined;

  @ApiProperty()
  total: number;

  @ApiProperty()
  totalPages: number;

  constructor(result?: PaginationResponse) {
    this.page = result?.page || 1;
    this.perPage = result?.perPage || 25;
    this.nextPage = result?.nextPage;
    this.prevPage = result?.prevPage;
    this.total = result?.total || 0;
    this.totalPages = result?.totalPages || 0;
  }

  static fromResult(result: PaginationResult) {
    return new PaginationResponse(result.toStruct());
  }
}
