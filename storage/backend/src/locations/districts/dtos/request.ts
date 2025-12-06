import { CityFilterField } from "@/locations/cities/dtos/request";
import { TransformArrParams } from "@/shared/decorators/transforms/arr-params.decorator";
import { PaginationRequest } from "@/shared/dtos/request";
import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { DistrictInsert } from "../district.model";

export class DistrictCreateRequest extends DistrictInsert {
  @ApiProperty({ description: "District ID", example: "1" })
  @IsString()
  @IsNotEmpty()
  declare id: string;

  @ApiProperty({ description: "District name", example: "District 1" })
  @IsString()
  @IsNotEmpty()
  declare name: string;
}

export class DistrictFilterField extends PickType(CityFilterField, ["id", "name"]) {}

export class DistrictFilterRequest extends PaginationRequest {
  @IsOptional()
  @TransformArrParams(DistrictFilterField)
  and?: DistrictFilterField[];
}
