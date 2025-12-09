import { Module } from "@nestjs/common";
import { CityController } from "./cities/city.controller";
import { CityCreateCommandHandler } from "./cities/commands/create.command";
import { DistrictCreateCommandHandler } from "./districts/commands/create.command";
import { DistrictController } from "./districts/district.controller";
import { LocationRepositoryModule } from "./location.repository.module";

@Module({
  imports: [LocationRepositoryModule],
  controllers: [CityController, DistrictController],
  providers: [CityCreateCommandHandler, DistrictCreateCommandHandler],
})
export class LocationsModule {}
