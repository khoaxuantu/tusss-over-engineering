import { UserIdentifier } from "@/providers/tokens/dtos/jwt.dto";
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

export class SignInResponse {
  @ApiProperty({ type: UserIdentifier })
  session: UserIdentifier;

  @ApiProperty()
  access_token: string;

  @ApiProperty()
  refresh_token: string;

  @ApiProperty()
  refresh_after: Date;

  constructor(data?: SignInResponse) {
    this.session = data?.session || new UserIdentifier();
    this.access_token = data?.access_token || "";
    this.refresh_token = data?.refresh_token || "";
    this.refresh_after = data?.refresh_after ?? new Date();
  }
}
