import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

import type { Role } from "./enums.auto";

export type Admin = {
    id: Generated<number>;
    name: string;
    password: string;
    roles: Role[];
};
export type TusssDb = {
    admins: Admin;
};
