import { Injectable } from "@nestjs/common";
import { ConfigService, Path } from "@nestjs/config";
import { Config } from "./types";

@Injectable()
export class TusssConfigService extends ConfigService<Config> {
  constructor(private readonly configService: ConfigService<Config>) {
    super();
  }

  get<T extends Path<Config>>(propertyPath: T) {
    return this.configService.get(propertyPath, { infer: true });
  }

  getOrThrow<T extends Path<Config>>(propertyPath: T) {
    return this.configService.getOrThrow(propertyPath, { infer: true });
  }
}
