import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

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
