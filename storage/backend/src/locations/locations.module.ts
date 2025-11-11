import { Module } from "@nestjs/common";
import { LocationRepositoryModule } from "./repositories/location.repository.module";

@Module({
  imports: [LocationRepositoryModule],
})
export class LocationsModule {}
