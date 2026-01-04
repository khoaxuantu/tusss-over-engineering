import { Module } from "@nestjs/common";
import { SellerLocationWriteRepository } from "./repositories/seller-location.repository";

@Module({
  providers: [SellerLocationWriteRepository],
  exports: [SellerLocationWriteRepository],
})
export class ProviderSellerLocationModule {}
