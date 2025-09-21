import { TusssConfigService } from "@/configs/config.service";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserIdentifier } from "../dtos/jwt.dto";

@Injectable()
export class TusssJwtService {
  constructor(
    private jwt: JwtService,
    private config: TusssConfigService,
  ) {}

  signUser(instance: UserIdentifier) {
    const payload = UserIdentifier.toPlain(instance);
    const secret = this.config.getOrThrow("auth.secret.default");
    const accessToken = this.jwt.sign(payload, {
      secret,
      expiresIn: this.config.getOrThrow("auth.jwt_expiry.login"),
    });
    const refreshToken = this.jwt.sign(payload, {
      secret,
      expiresIn: this.config.getOrThrow("auth.jwt_expiry.refresh"),
    });

    return { accessToken, refreshToken };
  }

  verify<T extends Record<string, any>>(token: string): T {
    const secret = this.config.getOrThrow("auth.secret.default");
    return this.jwt.verify<T>(token, { ignoreExpiration: false, secret });
  }
}
