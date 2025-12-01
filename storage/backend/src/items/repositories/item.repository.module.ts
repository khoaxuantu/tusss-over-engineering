import { Global, Module } from "@nestjs/common";
import { ItemReadRepository, ItemRepository, ItemWriteRepository } from "./item.repository";

@Global()
@Module({
  providers: [ItemRepository, ItemReadRepository, ItemWriteRepository],
  exports: [ItemRepository],
})
export class ItemRepositoryModule {}
