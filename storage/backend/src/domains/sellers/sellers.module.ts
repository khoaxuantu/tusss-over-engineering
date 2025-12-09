import { Module } from "@nestjs/common";
import { SellerRepositoryModule } from "./seller.repository.module";

@Module({
  imports: [SellerRepositoryModule],
})
export class SellersModule {}
