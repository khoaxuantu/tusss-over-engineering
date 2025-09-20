import { TusssConfigService } from "@/configs/config.service";
import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { TusssDb } from "../types/schemas.auto";
import { DbClientProvider } from "./constants";
import { DbClient } from "./types";

@Global()
@Module({
  providers: [
    {
      provide: DbClientProvider,
      inject: [ConfigService],
      useFactory: (config: TusssConfigService): DbClient => {
        const pool = new Pool({
          host: config.getOrThrow("db.host"),
          user: config.getOrThrow("db.user"),
          password: config.getOrThrow("db.password"),
          database: config.getOrThrow("db.name"),
          port: config.getOrThrow("db.port"),
        });
        const dialect = new PostgresDialect({ pool });
        const db = new Kysely<TusssDb>({ dialect });

        return db;
      },
    },
  ],
  exports: [DbClientProvider],
})
export class DatabaseModule {}
