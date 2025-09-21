import { Module } from "@nestjs/common";
import { AdminRepositoryModule } from "./repositories/admin.repository.module";

@Module({
  imports: [AdminRepositoryModule],
})
export class AdminModule {}
