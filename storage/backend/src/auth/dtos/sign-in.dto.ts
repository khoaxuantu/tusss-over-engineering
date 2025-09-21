import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  username: string = "";

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string = "";
}
