import { Module } from "@nestjs/common";
import { SellerLocationRepositoryModule } from "./sellers-locations.repository.module";

@Module({
  imports: [SellersLocationsModule, SellerLocationRepositoryModule],
})
export class SellersLocationsModule {}
