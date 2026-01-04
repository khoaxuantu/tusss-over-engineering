import { ApiProperty } from "@nestjs/swagger";

export class CommonResponse {
  @ApiProperty({ description: "The message of the response" })
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}
