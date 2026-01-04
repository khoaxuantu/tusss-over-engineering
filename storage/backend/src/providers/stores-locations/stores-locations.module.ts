import { Module } from "@nestjs/common";
import { StoreLocationGetMapQueryHandler } from "./queries/get-map.query";
import { StoreLocationGetOneQueryHandler } from "./queries/get-one.query";
import { StoreLocationWriteRepository } from "./repositories/store-location.repository";

@Module({
  providers: [
    StoreLocationWriteRepository,
    StoreLocationGetOneQueryHandler,
    StoreLocationGetMapQueryHandler,
  ],
  exports: [StoreLocationWriteRepository],
})
export class ProviderStoreLocationModule {}
