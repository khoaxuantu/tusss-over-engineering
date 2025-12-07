import { TusssConfigService } from "@/configs/config.service";
import { Logger, Provider } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DecimalPrecision, formatErrWithStack } from "@tusss/core";
import {
  CamelCasePlugin,
  DummyDriver,
  Kysely,
  PostgresAdapter,
  PostgresDialect,
  PostgresIntrospector,
  PostgresQueryCompiler,
} from "kysely";
import { Pool } from "pg";
import { DbClientProvider } from "./constants";
import { setupDbParser } from "./parser";
import { Db, DbClient } from "./types";

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
    const db = new Kysely<Db>({
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

export const DbCold = new Kysely<Db>({
  dialect: {
    createAdapter: () => new PostgresAdapter(),
    createDriver: () => new DummyDriver(),
    createIntrospector: () => new PostgresIntrospector(DbCold),
    createQueryCompiler: () => new PostgresQueryCompiler(),
  },
});
