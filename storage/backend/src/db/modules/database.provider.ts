import { TusssConfigService } from "@/configs/config.service";
import { DecimalPrecision } from "@/shared/helpers/calc.helper";
import { formatErrWithStack } from "@/shared/helpers/format.helper";
import { Logger, Provider } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { TusssDb } from "../types/schemas.auto";
import { DbClientProvider } from "./constants";
import { setupDbParser } from "./parser";
import { DbClient } from "./types";

const logger = new Logger("Kysely");

export const DbProvider = {
  provide: DbClientProvider,
  inject: [ConfigService],
  useFactory: (config: TusssConfigService): DbClient => {
    setupDbParser();

    const pool = new Pool({
      host: config.getOrThrow("db.host"),
      user: config.getOrThrow("db.user"),
      password: config.getOrThrow("db.password"),
      database: config.getOrThrow("db.name"),
      port: config.getOrThrow("db.port"),
    });
    const dialect = new PostgresDialect({ pool });
    const db = new Kysely<TusssDb>({
      dialect,
      plugins: [new CamelCasePlugin()],
      log(event) {
        if (event.level == "error") {
          logger.error(
            `[ouch!][${DecimalPrecision.round(event.queryDurationMillis, 2)}ms] ${formatErrWithStack(event.error as any)}`,
          );
        }
        logger.debug(
          `[query][${DecimalPrecision.round(event.queryDurationMillis, 2)}ms] ${event.query.sql}`,
        );
      },
    });

    return db;
  },
} as const satisfies Provider;
