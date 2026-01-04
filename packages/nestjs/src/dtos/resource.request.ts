import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class ResourceParams {
  @ApiProperty({ description: "The id of the resource, representing as a number", example: 1 })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  id: number;

  constructor(props?: ResourceParams) {
    this.id = props?.id || 0;
  }
}
