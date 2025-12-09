import { Global, Module } from "@nestjs/common";
import {
  SellerReadRepository,
  SellerRepository,
  SellerWriteRepository,
} from "./repositories/seller.repository";

@Global()
@Module({
  providers: [SellerRepository, SellerReadRepository, SellerWriteRepository],
  exports: [SellerRepository],
})
export class SellerRepositoryModule {}
