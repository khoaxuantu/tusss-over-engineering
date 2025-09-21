import { types as pgTypes } from "pg";

/**
 * Because PostgreSQL returns a column that has a specific type as a string by default, the pg
 * driver may not provide any built-in parser for them. For example, an array will return a `{}`,
 * or an int8 will return as a string.
 *
 * Therefore, we have to setup the parsers manually using pg's `setTypeParser` method.
 *
 * To check the oid, we can run this query:
 *
 * ```sql
 *  select typname, oid from pg_type where typname = "?"
 * ```
 */
export function setupDbParser() {
  pgTypes.setTypeParser(pgTypes.builtins.INT8, (val) => parseInt(val, 10));
  pgTypes.setTypeParser(pgTypes.builtins.NUMERIC, (val) => parseFloat(val));
  pgTypes.setTypeParser(16472 as number, (val) => parsePgArray(val));
}

export function parsePgArray(s: string): string[] {
  return s.match(/[\w.-]+/g) ?? [];
}
