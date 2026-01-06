import { Global, Module } from "@nestjs/common";
import { DbClientProvider } from "./constants";
import { DbProvider } from "./database.provider";

@Global()
@Module({
  providers: [DbProvider],
  exports: [DbClientProvider],
})
export class DatabaseModule {}
