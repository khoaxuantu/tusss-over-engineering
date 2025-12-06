import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive } from "class-validator";
import { PaginationParams } from "../models/pagination.model";

export class PaginationRequest implements Partial<PaginationParams> {
  @ApiPropertyOptional({ description: "The current page", example: 1 })
  @IsPositive({ message: "Page must be a positive number" })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @ApiPropertyOptional({ description: "The number of items per page", example: 10 })
  @IsPositive({ message: "Page size must be a positive number" })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  perPage?: number;

  constructor(data?: PaginationParams) {
    Object.assign(this, data);
  }
}
