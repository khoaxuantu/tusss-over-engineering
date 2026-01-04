import { ProviderSellerLocationModule } from "@/providers/sellers-locations/sellers-locations.module";
import { ProviderSellerModule } from "@/providers/sellers/seller.module";
import { Module } from "@nestjs/common";
import { SellerCreateCommandHandler } from "./commands/create.command";
import { SellerController } from "./controllers/seller.controller";
import { SellerFilterQueryHandler } from "./queries/filter.query";
import { SellerGetOneQueryHandler } from "./queries/get-one.query";

@Module({
  imports: [ProviderSellerModule, ProviderSellerLocationModule],
  controllers: [SellerController],
  providers: [SellerCreateCommandHandler, SellerGetOneQueryHandler, SellerFilterQueryHandler],
})
export class SellersModule {}
