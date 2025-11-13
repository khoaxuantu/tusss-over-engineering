import { Module } from "@nestjs/common";
import { CityController } from "./cities/city.controller";
import { CityCreateCommandHandler } from "./cities/commands/create.command";
import { LocationRepositoryModule } from "./location.repository.module";

@Module({
  imports: [LocationRepositoryModule],
  controllers: [CityController],
  providers: [CityCreateCommandHandler],
})
export class LocationsModule {}
