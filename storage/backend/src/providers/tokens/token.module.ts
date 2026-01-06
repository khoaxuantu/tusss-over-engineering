import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TusssJwtService } from "./services/jwt.service";
import { PasswordService } from "./services/password.service";
import { TokenService } from "./services/token.service";

@Module({
  imports: [JwtModule.register({})],
  providers: [TokenService, PasswordService, TusssJwtService],
  exports: [TokenService],
})
export class TokenModule {}
