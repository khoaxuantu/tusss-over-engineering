import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

import type { SellerType, Role } from "./enums.auto";

export type ItemsItemsTable = {
    parentId: number;
    childId: number;
};
export type ItemTable = {
    id: Generated<number>;
    name: string;
    price: number;
    description: string | null;
    href: string | null;
    archived: boolean | null;
    retailerId: number;
    brandId: number;
};
export type PurchaseLogTable = {
    date: Generated<Timestamp>;
    buyerId: number;
    itemId: number;
};
export type SellerTable = {
    id: Generated<number>;
    name: string;
    type: SellerType;
    location: string | null;
    href: string | null;
};
export type UsersOwningItemsTable = {
    createdAt: Generated<Timestamp>;
    userId: number;
    itemId: number;
};
export type UsersWatchingItemsTable = {
    createdAt: Generated<Timestamp>;
    userId: number;
    itemId: number;
};
export type UserTable = {
    id: Generated<number>;
    name: string;
    password: string;
    roles: Role[];
    createdAt: Generated<Timestamp>;
    updatedAt: Generated<Timestamp>;
};
export type TusssDb = {
    items: ItemTable;
    itemsItems: ItemsItemsTable;
    purchaseLogs: PurchaseLogTable;
    sellers: SellerTable;
    users: UserTable;
    usersOwningItems: UsersOwningItemsTable;
    usersWatchingItems: UsersWatchingItemsTable;
};
