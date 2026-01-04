import { Db } from "@/db/modules/types";
import loadConfig from "@/shared/configs/loader";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";

export class DbClient {
  private static instance: DbClient;

  readonly db: Kysely<Db>;

  private constructor() {
    const config = loadConfig();
    const pool = new Pool({
      host: config.db.host,
      user: config.db.user,
      password: config.db.password,
      database: config.db.name,
      port: config.db.port,
    });
    const dialect = new PostgresDialect({ pool });
    this.db = new Kysely<Db>({ dialect, log: ["error", "query"] });
  }

  static getInstance() {
    if (!DbClient.instance) {
      DbClient.instance = new DbClient();
    }
    return DbClient.instance;
  }
}
