import { Module } from "@nestjs/common";
import { PasswordService } from "./services/password.service";
import { TokenService } from "./services/token.service";

@Module({
  providers: [TokenService, PasswordService],
  exports: [TokenService],
})
export class TokenModule {}
