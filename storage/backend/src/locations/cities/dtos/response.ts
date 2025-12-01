import { ApiProperty } from "@nestjs/swagger";

export class CityCreateResponse {
  @ApiProperty()
  new_id: string;

  constructor(data?: Partial<CityCreateResponse>) {
    this.new_id = data?.new_id ?? "";
  }
}
