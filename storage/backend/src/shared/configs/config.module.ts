import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TusssConfigService } from "./config.service";
import ConfigLoader from "./loader";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [async () => await ConfigLoader.load()] }),
  ],
  providers: [TusssConfigService],
  exports: [TusssConfigService],
})
export class TusssConfigModule {}
