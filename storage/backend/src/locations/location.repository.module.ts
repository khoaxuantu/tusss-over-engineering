import { SharedRepositoryModule } from "@/shared/repos/shared-repository.module";
import { Global, Module } from "@nestjs/common";
import { CityReadRepository, CityWriteRepository } from "./cities/city.repository";
import { CityGetOneQueryHandler } from "./cities/queries/get-one.query";

@Global()
@Module({
  imports: [SharedRepositoryModule],
  providers: [CityWriteRepository, CityReadRepository, CityGetOneQueryHandler],
  exports: [CityWriteRepository, CityReadRepository],
})
export class LocationRepositoryModule {}
