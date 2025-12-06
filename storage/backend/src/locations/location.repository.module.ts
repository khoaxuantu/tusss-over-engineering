import { SharedRepositoryModule } from "@/shared/repos/shared-repository.module";
import { Global, Module } from "@nestjs/common";
import { CityReadRepository, CityWriteRepository } from "./cities/city.repository";
import { CityFilterQueryHandler } from "./cities/queries/filter.query";
import { CityGetOneQueryHandler } from "./cities/queries/get-one.query";
import { DistrictReadRepository, DistrictWriteRepository } from "./districts/district.repository";
import { DistrictFilterQueryHandler } from "./districts/queries/filter.query";
import { DistrictGetOneQueryHandler } from "./districts/queries/get-one.query";

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
    DistrictGetOneQueryHandler,
    DistrictFilterQueryHandler,
  ],
  exports: [
    CityWriteRepository,
    CityReadRepository,
    DistrictWriteRepository,
    DistrictReadRepository,
  ],
})
export class LocationRepositoryModule {}
