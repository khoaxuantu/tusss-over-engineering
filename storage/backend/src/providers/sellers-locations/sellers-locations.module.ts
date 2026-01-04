import { Module } from "@nestjs/common";
import { SellerLocationGetMapQueryHandler } from "./queries/get-map.query";
import { SellerLocationGetOneQueryHandler } from "./queries/get-one.query";
import { SellerLocationWriteRepository } from "./repositories/seller-location.repository";

@Module({
  providers: [
    SellerLocationWriteRepository,
    SellerLocationGetOneQueryHandler,
    SellerLocationGetMapQueryHandler,
  ],
  exports: [SellerLocationWriteRepository],
})
export class ProviderSellerLocationModule {}
