import { Module } from "@nestjs/common";
import { SellerLocationGetOneQueryHandler } from "./queries/get-one.query";
import { SellerLocationWriteRepository } from "./repositories/seller-location.repository";

@Module({
  providers: [SellerLocationWriteRepository, SellerLocationGetOneQueryHandler],
  exports: [SellerLocationWriteRepository],
})
export class ProviderSellerLocationModule {}
