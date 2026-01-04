import { Module } from "@nestjs/common";
import { TokenModule } from "../tokens/token.module";
import {
  UserReadRepository,
  UserRepository,
  UserWriteRepository,
} from "./repositories/user.repository";

@Module({
  imports: [TokenModule],
  providers: [UserRepository, UserWriteRepository, UserReadRepository],
  exports: [UserRepository],
})
export class ProviderUserModule {}
