import { StoreExternalEnum } from "@/providers/stores/constants";
import { StoreType } from "@/shared/db/types/enums.auto";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { enumToArray } from "@tusss/core";
import { PaginationRequest } from "@tusss/nestjs";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class StoreCreateRequest {
  @ApiProperty({ example: "Burger Store" })
  @IsString()
  @IsNotEmpty()
  name: string = "";

  @ApiProperty({
    type: String,
    enum: enumToArray(StoreType),
    enumName: StoreExternalEnum.type,
    default: StoreType.AUTH,
  })
  @IsEnum(StoreType)
  @IsNotEmpty()
  type: StoreType = StoreType.AUTH;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  href?: string;

  @ApiProperty({ example: "hanoi" })
  @IsString()
  @IsNotEmpty()
  city_id: string = "";

  @ApiProperty({ example: "tayho" })
  @IsString()
  @IsNotEmpty()
  district_id: string = "";
}

export class StoreFilterRequest extends PaginationRequest {}
