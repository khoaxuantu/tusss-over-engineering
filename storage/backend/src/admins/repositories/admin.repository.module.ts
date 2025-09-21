import { Global, Module } from "@nestjs/common";
import { AdminReadRepository, AdminRepository, AdminWriteRepository } from "./admin.repository";

@Global()
@Module({
  providers: [AdminWriteRepository, AdminReadRepository, AdminRepository],
  exports: [AdminRepository],
})
export class AdminRepositoryModule {}
