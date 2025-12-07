import { TransformArrParams } from "@/shared/decorators/transforms/arr-params.decorator";
import { PaginationRequest } from "@/shared/dtos/request";
import { FilterString } from "@/shared/models/filter.model";
import { Sort } from "@/shared/models/sort.model";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CityCreateRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  constructor(data?: Partial<CityCreateRequest>) {
    this.id = data?.id ?? "";
    this.name = data?.name ?? "";
  }
}

export class CityFilterField {
  @ApiPropertyOptional({ type: FilterString })
  id?: FilterString;

  @ApiPropertyOptional({ type: FilterString })
  name?: FilterString;
}

export class CityFilterRequest extends PaginationRequest {
  @IsOptional()
  @TransformArrParams(CityFilterField)
  and?: CityFilterField[];

  @IsOptional()
  @TransformArrParams(Sort)
  sorts?: Sort<"name">[];
}
