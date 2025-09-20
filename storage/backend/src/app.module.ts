import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TusssConfigModule } from "./configs/config.module";
import { DatabaseModule } from "./db/modules/database.module";

@Module({
  imports: [DatabaseModule, TusssConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
