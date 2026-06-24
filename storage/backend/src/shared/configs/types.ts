import { JwtSignOptions } from "@nestjs/jwt";
import { Config as TusssConfig } from "@tusss/ood";

export interface CommonConfig {
  db: {
    name: string;
    host: string;
    user: string;
    password: string;
    port: number;
  };
  auth: {
    secret: {
      default: string;
    };
    jwt_expiry: {
      login: JwtSignOptions["expiresIn"];
      refresh: JwtSignOptions["expiresIn"];
    };
    timer: {
      /**
       * milliseconds
       */
      refresh_after: number;
    };
  };
}

export interface Config extends TusssConfig<CommonConfig> {}
