import { TokenModule } from "@/shared/tokens/token.module";
import { Global, Module } from "@nestjs/common";
import { AdminReadRepository, AdminRepository, AdminWriteRepository } from "./admin.repository";

@Global()
@Module({
  providers: [AdminWriteRepository, AdminReadRepository, AdminRepository],
  exports: [AdminRepository],
  imports: [TokenModule],
})
export class AdminRepositoryModule {}
