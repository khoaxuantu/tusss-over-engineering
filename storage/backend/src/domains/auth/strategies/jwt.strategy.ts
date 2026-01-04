import { UserIdentifier } from "@/providers/tokens/dtos/jwt.dto";
import { TusssConfigService } from "@/shared/configs/config.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { validate } from "class-validator";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: TusssConfigService) {
    const secret = config.getOrThrow("auth.secret.default");

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: any) {
    const user = UserIdentifier.create(payload);
    const errors = await validate(user);

    if (!user.id || errors.length) throw new UnauthorizedException();

    return user;
  }
}
