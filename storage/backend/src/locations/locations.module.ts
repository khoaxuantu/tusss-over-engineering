import { Module } from "@nestjs/common";
import { CityController } from "./cities/city.controller";
import { LocationRepositoryModule } from "./location.repository.module";

@Module({
  imports: [LocationRepositoryModule],
  controllers: [CityController],
})
export class LocationsModule {}
