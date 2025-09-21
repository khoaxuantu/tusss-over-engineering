import { UserIdentifier } from "@/shared/tokens/dtos/jwt.dto";
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
  session: UserIdentifier = new UserIdentifier();

  @ApiProperty()
  access_token: string = "";

  @ApiProperty()
  refresh_token: string = "";

  constructor(data?: SignInResponse) {
    if (data) {
      this.session = data.session;
      this.access_token = data.access_token;
      this.refresh_token = data.refresh_token;
    }
  }
}
