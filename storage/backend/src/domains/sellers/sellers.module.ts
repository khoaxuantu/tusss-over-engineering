import { Module } from "@nestjs/common";
import { SellerCreateCommandHandler } from "./commands/create.command";
import { SellerController } from "./controllers/seller.controller";
import { SellerRepositoryModule } from "./seller.repository.module";

@Module({
  imports: [SellerRepositoryModule],
  controllers: [SellerController],
  providers: [SellerCreateCommandHandler],
})
export class SellersModule {}
