import { SharedRepositoryModule } from "@/shared/repos/shared-repository.module";
import { Module } from "@nestjs/common";
import {
  SellerFilterRepository,
  SellerReadRepository,
  SellerRepository,
  SellerWriteRepository,
} from "./repositories/seller.repository";

@Module({
  imports: [SharedRepositoryModule],
  providers: [
    SellerRepository,
    SellerWriteRepository,
    SellerReadRepository,
    SellerFilterRepository,
  ],
  exports: [SellerRepository, SellerWriteRepository, SellerReadRepository, SellerFilterRepository],
})
export class ProviderSellerModule {}
