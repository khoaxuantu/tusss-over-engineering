import { UserIdentifier } from "@/shared/tokens/dtos/jwt.dto";
import { TokenService } from "@/shared/tokens/services/token.service";
import { UserRepository } from "@/users/repositories/user.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  constructor(
    private adminRepo: UserRepository,
    private tokenService: TokenService,
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
    const tokens = this.tokenService.jwt.signUser(user);

    return { payload: user, tokens };
  }
}
