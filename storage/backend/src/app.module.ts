import { Module } from "@nestjs/common";
import { AdminModule } from "./admins/admin.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { TusssConfigModule } from "./configs/config.module";
import { DatabaseModule } from "./db/modules/database.module";

@Module({
  imports: [DatabaseModule, TusssConfigModule, AdminModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
