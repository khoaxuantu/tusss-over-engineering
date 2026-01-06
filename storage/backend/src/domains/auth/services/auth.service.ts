import { UserIdentifier } from "@/providers/tokens/dtos/jwt.dto";
import { TokenService } from "@/providers/tokens/services/token.service";
import { UserRepository } from "@/providers/users/repositories/user.repository";
import { TusssConfigService } from "@/shared/configs/config.service";
import { Injectable } from "@nestjs/common";
import { addMilliseconds } from "date-fns";

@Injectable()
export class AuthService {
  constructor(
    private adminRepo: UserRepository,
    private tokenService: TokenService,
    private configService: TusssConfigService,
  ) {}

  async login(username: string, password: string) {
    const encryptedPwd = await this.adminRepo.read.getPassword(username);
    if (!encryptedPwd?.password) return undefined;
    const matched = await this.tokenService.password.check(password, encryptedPwd.password);
    if (!matched) return undefined;

    const admin = await this.adminRepo.read.findById(encryptedPwd.id);
    return admin;
  }

  sign(user: UserIdentifier) {
    const refreshAfterMs = this.configService.getOrThrow("auth.timer.refresh_after");
    const refreshAfter = addMilliseconds(new Date(), refreshAfterMs);
    const tokens = this.tokenService.jwt.signUser(user);

    return { payload: user, tokens, refreshAfter };
  }
}
