import { Kysely } from "kysely";
import { TusssDb } from "../types/schemas.auto";

export type DbClient = Kysely<TusssDb>;
