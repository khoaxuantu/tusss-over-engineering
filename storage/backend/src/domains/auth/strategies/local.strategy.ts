import { UserIdentifier } from "@/shared/tokens/dtos/jwt.dto";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../services/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private auth: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    const admin = await this.auth.login(username, password);
    if (!admin) throw new UnauthorizedException();
    return UserIdentifier.fromUser(admin);
  }
}
