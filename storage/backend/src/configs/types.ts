import { ConfigService } from "@nestjs/config";

export interface CommonConfig {
  db: {
    name: string;
    host: string;
    user: string;
    password: string;
    port: number;
  };
}

export interface Config extends CommonConfig {
  environment: "development" | "production" | "test";
}

export type TusssConfigService = ConfigService<Config, true>;
