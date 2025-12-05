import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional } from "class-validator";
import { TransformArrParams } from "../decorators/transforms/arr-params.decorator";

export class FilterString {
  @ApiPropertyOptional({ description: "Equal" })
  @IsOptional()
  eq?: string;

  @ApiPropertyOptional({ description: "Not Equal" })
  @IsOptional()
  ne?: string;

  @ApiPropertyOptional({ description: "In an array" })
  @IsOptional()
  @TransformArrParams(String)
  in?: string[];

  @ApiPropertyOptional({ description: "Not in an array" })
  @IsOptional()
  @TransformArrParams(String)
  nin?: string[];

  @ApiPropertyOptional({ description: "Contains" })
  @IsOptional()
  contain?: string;
}

export class FilterNumber {
  @ApiPropertyOptional({ description: "Equal" })
  @IsOptional()
  eq?: number;

  @ApiPropertyOptional({ description: "Not Equal" })
  @IsOptional()
  ne?: number;

  @ApiPropertyOptional({ description: "In an array" })
  @IsOptional()
  @TransformArrParams(Number)
  in?: number[];

  @ApiPropertyOptional({ description: "Not in an array" })
  @IsOptional()
  @TransformArrParams(Number)
  nin?: number[];

  @ApiPropertyOptional({ description: "Greater than" })
  @IsOptional()
  gt?: number;

  @ApiPropertyOptional({ description: "Greater than or equal" })
  @IsOptional()
  gte?: number;

  @ApiPropertyOptional({ description: "Less than" })
  @IsOptional()
  lt?: number;

  @ApiPropertyOptional({ description: "Less than or equal" })
  @IsOptional()
  lte?: number;
}

export class FilterDate {
  @ApiPropertyOptional({ description: "Equal" })
  @IsOptional()
  @Type(() => Date)
  eq?: Date;

  @ApiPropertyOptional({ description: "Not Equal" })
  @IsOptional()
  @Type(() => Date)
  ne?: Date;

  @ApiPropertyOptional({ description: "In an array" })
  @IsOptional()
  @TransformArrParams(Date)
  in?: Date[];

  @ApiPropertyOptional({ description: "Not in an array" })
  @IsOptional()
  @TransformArrParams(Date)
  nin?: Date[];

  @ApiPropertyOptional({ description: "Greater than" })
  @IsOptional()
  @Type(() => Date)
  gt?: Date;

  @ApiPropertyOptional({ description: "Greater than or equal" })
  @IsOptional()
  @Type(() => Date)
  gte?: Date;

  @ApiPropertyOptional({ description: "Less than" })
  @IsOptional()
  @Type(() => Date)
  lt?: Date;

  @ApiPropertyOptional({ description: "Less than or equal" })
  @IsOptional()
  @Type(() => Date)
  lte?: Date;
}
