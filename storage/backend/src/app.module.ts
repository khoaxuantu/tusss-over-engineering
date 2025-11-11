import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { TusssConfigModule } from "./configs/config.module";
import { DatabaseModule } from "./db/modules/database.module";
import { LocationsModule } from "./locations/locations.module";
import { CatchEverythingFilter } from "./shared/errors/catch-all.filter";
import { UserModule } from "./users/user.module";

@Module({
  imports: [DatabaseModule, TusssConfigModule, UserModule, AuthModule, LocationsModule],
  controllers: [AppController],
  providers: [AppService, { provide: APP_FILTER, useClass: CatchEverythingFilter }],
})
export class AppModule {}
