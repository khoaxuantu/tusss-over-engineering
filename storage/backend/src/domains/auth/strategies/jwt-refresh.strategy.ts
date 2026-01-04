import { UserIdentifier } from "@/providers/tokens/dtos/jwt.dto";
import { TusssConfigService } from "@/shared/configs/config.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { validate } from "class-validator";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtRefreshKey, RefreshTokenField } from "../constants";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, JwtRefreshKey) {
  constructor(config: TusssConfigService) {
    const secret = config.getOrThrow("auth.secret.default");

    super({
      jwtFromRequest: ExtractJwt.fromBodyField(RefreshTokenField),
      secretOrKey: secret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    const user = UserIdentifier.create(payload);
    const errors = await validate(user);

    if (!user.id || errors.length) throw new UnauthorizedException();

    return user;
  }
}
