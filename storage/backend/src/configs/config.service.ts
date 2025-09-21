import { Injectable } from "@nestjs/common";
import { ConfigService, Path } from "@nestjs/config";
import { Config } from "./types";

@Injectable()
export class TusssConfigService {
  constructor(private readonly configService: ConfigService<Config>) {}

  get<T extends Path<Config>>(propertyPath: T) {
    return this.configService.get(propertyPath, { infer: true });
  }

  getOrThrow<T extends Path<Config>>(propertyPath: T) {
    return this.configService.getOrThrow(propertyPath, { infer: true });
  }
}
