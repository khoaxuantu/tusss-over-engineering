import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { CqrsModule } from "@nestjs/cqrs";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { TusssConfigModule } from "./configs/config.module";
import { DatabaseModule } from "./db/modules/database.module";
import { LocationsModule } from "./domains/locations/locations.module";
import { SellersLocationsModule } from "./domains/sellers-locations/sellers-locations.module";
import { SellersModule } from "./domains/sellers/sellers.module";
import { UserModule } from "./domains/users/user.module";
import { CatchEverythingFilter } from "./shared/errors/catch-all.filter";

@Module({
  imports: [
    DatabaseModule,
    TusssConfigModule,
    CqrsModule.forRoot(),
    UserModule,
    AuthModule,
    LocationsModule,
    SellersLocationsModule,
    SellersModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_FILTER, useClass: CatchEverythingFilter }],
})
export class AppModule {}
