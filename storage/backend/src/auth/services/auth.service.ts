import { AdminRepository } from "@/admins/repositories/admin.repository";
import { TokenService } from "@/shared/tokens/services/token.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  constructor(
    private adminRepo: AdminRepository,
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
}
