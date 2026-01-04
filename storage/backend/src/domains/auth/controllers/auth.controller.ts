import { CurrentUser } from "@/domains/users/decorators/current-user.decorator";
import { UserIdentifier } from "@/shared/tokens/dtos/jwt.dto";
import { Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBody, ApiResponse } from "@nestjs/swagger";
import { Public } from "../decorators/public.decorator";
import { RefreshTokenRequest, RefreshTokenResponse } from "../dtos/refresh-token.dto";
import { SignInRequest, SignInResponse } from "../dtos/sign-in.dto";
import { JwtRefreshGuard } from "../guards/jwt.guard";
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
  login(@CurrentUser() user: UserIdentifier) {
    const res = this.authService.sign(user);
    return new SignInResponse({
      session: res.payload,
      refresh_token: res.tokens.refreshToken,
      access_token: res.tokens.accessToken,
    });
  }

  @Post("token/refresh")
  @Public()
  @UseGuards(JwtRefreshGuard)
  @ApiBody({ type: RefreshTokenRequest })
  @ApiResponse({ type: RefreshTokenResponse })
  refresh(@CurrentUser() user: UserIdentifier) {
    const res = this.authService.sign(user);
    return new RefreshTokenResponse({
      access_token: res.tokens.accessToken,
      refresh_token: res.tokens.refreshToken,
    });
  }
}
