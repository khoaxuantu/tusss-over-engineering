import { Kysely } from "kysely";
import { TusssDb } from "../types/schemas.auto";

export type Db = TusssDb;
export type DbClient = Kysely<TusssDb>;
export type DbTable = keyof TusssDb;
