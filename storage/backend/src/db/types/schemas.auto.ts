import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

import type { SellerType, Role } from "./enums.auto";

export type ItemsItemsTable = {
    parent_id: number;
    child_id: number;
};
export type ItemTable = {
    id: Generated<number>;
    name: string;
    price: number;
    description: string | null;
    href: string | null;
    archived: boolean | null;
    retailer_id: number;
    brand_id: number;
};
export type PurchaseLogTable = {
    date: Generated<Timestamp>;
    buyer_id: number;
    item_id: number;
};
export type SellerTable = {
    id: Generated<number>;
    name: string;
    type: SellerType;
    location: string | null;
    href: string | null;
};
export type UsersOwningItemsTable = {
    created_at: Generated<Timestamp>;
    user_id: number;
    item_id: number;
};
export type UsersWatchingItemsTable = {
    created_at: Generated<Timestamp>;
    user_id: number;
    item_id: number;
};
export type UserTable = {
    id: Generated<number>;
    name: string;
    password: string;
    roles: Role[];
    created_at: Generated<Timestamp>;
    updated_at: Generated<Timestamp>;
};
export type TusssDb = {
    items: ItemTable;
    items_items: ItemsItemsTable;
    purchase_logs: PurchaseLogTable;
    sellers: SellerTable;
    users: UserTable;
    users_owning_items: UsersOwningItemsTable;
    users_watching_items: UsersWatchingItemsTable;
};
