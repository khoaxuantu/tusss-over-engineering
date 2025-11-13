import { Global, Module } from "@nestjs/common";
import { CityWriteRepository } from "./cities/city.repository";

@Global()
@Module({
  providers: [CityWriteRepository],
  exports: [CityWriteRepository],
})
export class LocationRepositoryModule {}
