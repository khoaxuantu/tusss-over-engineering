import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationDefault } from "@tusss/core";
import { PaginationResult } from "../models/pagination.model";

export class PaginationResponse {
  @ApiProperty()
  page: number;

  @ApiProperty()
  per_page: number;

  @ApiProperty()
  total: number;

  @ApiProperty()
  total_pages: number;

  @ApiPropertyOptional({ type: "number" })
  next_page?: number | undefined;

  @ApiPropertyOptional({ type: "number" })
  prev_page?: number | undefined;

  constructor(props?: Partial<PaginationResponse>) {
    this.page = props?.page ?? PaginationDefault.page;
    this.per_page = props?.per_page ?? PaginationDefault.perPage;
    this.total = props?.total ?? 0;
    this.total_pages = props?.total_pages ?? 0;
    this.next_page = props?.next_page;
    this.prev_page = props?.prev_page;
  }

  static fromModel(data: PaginationResult) {
    return new PaginationResponse({
      page: data.page,
      per_page: data.perPage,
      total: data.total,
      total_pages: data.totalPages,
      next_page: data.nextPage,
      prev_page: data.prevPage,
    });
  }
}

export class CommonResponse {
  @ApiProperty()
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}
