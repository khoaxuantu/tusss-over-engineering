import { TokenModule } from "@/shared/tokens/token.module";
import { Global, Module } from "@nestjs/common";
import { UserReadRepository, UserRepository, UserWriteRepository } from "./user.repository";

@Global()
@Module({
  providers: [UserWriteRepository, UserReadRepository, UserRepository],
  exports: [UserRepository],
  imports: [TokenModule],
})
export class UserRepositoryModule {}
