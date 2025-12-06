import { SharedRepositoryModule } from "@/shared/repos/shared-repository.module";
import { Global, Module } from "@nestjs/common";
import { CityReadRepository, CityWriteRepository } from "./cities/city.repository";
import { CityFilterQueryHandler } from "./cities/queries/filter.query";
import { CityGetOneQueryHandler } from "./cities/queries/get-one.query";
import { DistrictReadRepository, DistrictWriteRepository } from "./districts/district.repository";

@Global()
@Module({
  imports: [SharedRepositoryModule],
  providers: [
    CityWriteRepository,
    CityReadRepository,
    CityGetOneQueryHandler,
    CityFilterQueryHandler,
    DistrictWriteRepository,
    DistrictReadRepository,
  ],
  exports: [
    CityWriteRepository,
    CityReadRepository,
    DistrictWriteRepository,
    DistrictReadRepository,
  ],
})
export class LocationRepositoryModule {}
