import { Global, Module } from "@nestjs/common";
import { SellerLocationWriteRepository } from "./repositories/seller-location.repository";

@Global()
@Module({
  providers: [SellerLocationWriteRepository],
  exports: [SellerLocationWriteRepository],
})
export class SellerLocationRepositoryModule {}
