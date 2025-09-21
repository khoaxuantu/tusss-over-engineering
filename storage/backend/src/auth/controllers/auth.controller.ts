import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { SignInRequest } from "../dtos/sign-in.dto";
import { LocalGuard } from "../guards/local.guard";

@Controller("auth")
export class AuthController {
  @Post("login")
  @UseGuards(LocalGuard)
  login(@Body() payload: SignInRequest) {
    console.log(payload);
  }
}
