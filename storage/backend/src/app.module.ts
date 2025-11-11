import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { TusssConfigModule } from "./configs/config.module";
import { DatabaseModule } from "./db/modules/database.module";
import { LocationsModule } from "./locations/locations.module";
import { UserModule } from "./users/user.module";

@Module({
  imports: [DatabaseModule, TusssConfigModule, UserModule, AuthModule, LocationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
