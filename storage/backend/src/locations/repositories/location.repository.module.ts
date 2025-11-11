import { Global, Module } from "@nestjs/common";
import { CityRepository, CityWriteRepository } from "./city.repository";

@Global()
@Module({
  providers: [CityWriteRepository, CityRepository],
  exports: [CityRepository],
})
export class LocationRepositoryModule {}
