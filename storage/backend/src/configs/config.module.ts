import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TusssConfigService } from "./config.service";
import loadConfig from "./loader";

@Global()
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [loadConfig] })],
  providers: [TusssConfigService],
  exports: [TusssConfigService],
})
export class TusssConfigModule {}
