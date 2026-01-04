import { Module } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { CqrsModule } from "@nestjs/cqrs";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./domains/auth/auth.module";
import { LocationsModule } from "./domains/locations/locations.module";
import { SellersModule } from "./domains/sellers/sellers.module";
import { UserModule } from "./domains/users/user.module";
import { TusssConfigModule } from "./shared/configs/config.module";
import { DatabaseModule } from "./shared/db/modules/database.module";
import { CatchEverythingFilter } from "./shared/errors/catch-all.filter";

@Module({
  imports: [
    DatabaseModule,
    TusssConfigModule,
    CqrsModule.forRoot(),
    UserModule,
    AuthModule,
    LocationsModule,
    SellersModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_FILTER, useClass: CatchEverythingFilter }],
})
export class AppModule {}
