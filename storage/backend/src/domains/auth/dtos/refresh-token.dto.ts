import { ApiProperty, PickType } from "@nestjs/swagger";
import { IsJWT, IsNotEmpty } from "class-validator";
import { RefreshTokenField } from "../constants";
import { SignInResponse } from "./sign-in.dto";

export class RefreshTokenRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsJWT()
  [RefreshTokenField]: string = "";
}

export class RefreshTokenResponse extends PickType(SignInResponse, [
  "access_token",
  "refresh_token",
  "refresh_after",
]) {
  constructor(data?: RefreshTokenResponse) {
    super();

    this.access_token = data?.access_token || "";
    this.refresh_token = data?.refresh_token || "";
    this.refresh_after = data?.refresh_after ?? new Date();
  }
}
