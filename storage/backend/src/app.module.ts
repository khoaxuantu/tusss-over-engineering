import { Module } from "@nestjs/common";
import { AdminModule } from "./admins/admin.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TusssConfigModule } from "./configs/config.module";
import { DatabaseModule } from "./db/modules/database.module";

@Module({
  imports: [DatabaseModule, TusssConfigModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
