export const StoreType = {
  AUTH: "AUTH",
  RETAIL: "RETAIL",
} as const;
export type StoreType = (typeof StoreType)[keyof typeof StoreType];
export const Role = {
  ADMIN: "ADMIN",
  EDITOR: "EDITOR",
  VIEWER: "VIEWER",
} as const;
export type Role = (typeof Role)[keyof typeof Role];
