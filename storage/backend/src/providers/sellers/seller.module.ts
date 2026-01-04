import { Module } from "@nestjs/common";
import {
  SellerReadRepository,
  SellerRepository,
  SellerWriteRepository,
} from "./repositories/seller.repository";

@Module({
  providers: [SellerRepository, SellerWriteRepository, SellerReadRepository],
  exports: [SellerRepository, SellerWriteRepository, SellerReadRepository],
})
export class ProviderSellerModule {}
