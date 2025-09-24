import { CurrentUser } from "@/users/decorators/current-user.decorator";
import { User } from "@/users/schemas/user.schema";
import { Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBody, ApiResponse } from "@nestjs/swagger";
import { Public } from "../decorators/public.decorator";
import { SignInRequest, SignInResponse } from "../dtos/sign-in.dto";
import { LocalGuard } from "../guards/local.guard";
import { AuthService } from "../services/auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  @Public()
  @UseGuards(LocalGuard)
  @ApiBody({
    type: SignInRequest,
    examples: {
      default: {
        value: {
          username: "tusss@tusss.com",
          password: "aaa",
        },
      },
    },
  })
  @ApiResponse({ type: SignInResponse })
  login(@CurrentUser() user: User) {
    const res = this.authService.sign(user);
    return new SignInResponse({
      session: res.payload,
      refresh_token: res.tokens.refreshToken,
      access_token: res.tokens.accessToken,
    });
  }
}
