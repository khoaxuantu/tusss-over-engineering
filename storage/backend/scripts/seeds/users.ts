import { Role } from "@/db/types/enums.auto";
import bcrypt from "bcrypt";
import { DbClient } from "./shared/db";

async function run() {
  const db = DbClient.getInstance().db;
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
