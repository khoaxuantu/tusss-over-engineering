import { SharedRepositoryModule } from "@/shared/repos/shared-repository.module";
import { Module } from "@nestjs/common";
import {
  StoreFilterRepository,
  StoreReadRepository,
  StoreRepository,
  StoreWriteRepository,
} from "./repositories/store.repository";

@Module({
  imports: [SharedRepositoryModule],
  providers: [StoreRepository, StoreWriteRepository, StoreReadRepository, StoreFilterRepository],
  exports: [StoreRepository, StoreWriteRepository, StoreReadRepository, StoreFilterRepository],
})
export class ProviderStoreModule {}
