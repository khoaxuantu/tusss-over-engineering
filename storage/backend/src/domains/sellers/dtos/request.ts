import { SellerType } from "@/shared/db/types/enums.auto";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { enumToArray } from "@tusss/core";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { SellerExternalEnum } from "../constants";

export class SellerCreateRequest {
  @ApiProperty({ example: "Burger Store" })
  @IsString()
  @IsNotEmpty()
  name: string = "";

  @ApiProperty({
    type: String,
    enum: enumToArray(SellerType),
    enumName: SellerExternalEnum.type,
    default: SellerType.AUTH,
  })
  @IsEnum(SellerType)
  @IsNotEmpty()
  type: SellerType = SellerType.AUTH;

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
