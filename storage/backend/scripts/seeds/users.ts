import loadConfig from "@/configs/loader";
import { Role } from "@/db/types/enums.auto";
import { TusssDb } from "@/db/types/schemas.auto";
import bcrypt from "bcrypt";
import { Kysely, PostgresDialect } from "kysely";
import { Pool } from "pg";

const config = loadConfig();
const pool = new Pool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.name,
  port: config.db.port,
});
const dialect = new PostgresDialect({ pool });
const db = new Kysely<TusssDb>({ dialect, log: ["error", "query"] });

async function run() {
  const pwd = await bcrypt.hash("aaa", 10);
  const query = db
    .insertInto("users")
    .values({
      name: "tusss@tusss.com",
      password: pwd,
      roles: [Role.ADMIN, Role.EDITOR, Role.VIEWER],
    })
    .returning("id");
  const res = await query.executeTakeFirst();
  console.log("Inserted user", res);

  const doc = await db.selectFrom("users").selectAll().executeTakeFirst();
  console.log(doc);
  console.log(typeof doc?.roles);

  db.destroy();
}

run();
