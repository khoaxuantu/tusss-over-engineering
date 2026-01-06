import { ProviderUserModule } from "@/providers/users/user.module";
import { Module } from "@nestjs/common";

@Module({
  imports: [ProviderUserModule],
})
export class UserModule {}
