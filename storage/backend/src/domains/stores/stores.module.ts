import { ProviderStoreLocationModule } from "@/providers/stores-locations/stores-locations.module";
import { ProviderStoreModule } from "@/providers/stores/store.module";
import { Module } from "@nestjs/common";
import { StoreCreateCommandHandler } from "./commands/create.command";
import { StoreController } from "./controllers/store.controller";
import { StoreFilterQueryHandler } from "./queries/filter.query";
import { StoreGetOneQueryHandler } from "./queries/get-one.query";

@Module({
  imports: [ProviderStoreModule, ProviderStoreLocationModule],
  controllers: [StoreController],
  providers: [StoreCreateCommandHandler, StoreGetOneQueryHandler, StoreFilterQueryHandler],
})
export class StoresModule {}
