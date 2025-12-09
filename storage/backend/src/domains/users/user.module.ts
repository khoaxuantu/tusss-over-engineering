import { Module } from "@nestjs/common";
import { UserRepositoryModule } from "./repositories/user.repository.module";

@Module({
  imports: [UserRepositoryModule],
})
export class UserModule {}
