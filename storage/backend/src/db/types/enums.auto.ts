export const SellerType = {
    AUTH: "AUTH",
    RETAIL: "RETAIL"
} as const;
export type SellerType = (typeof SellerType)[keyof typeof SellerType];
export const Role = {
    ADMIN: "ADMIN",
    EDITOR: "EDITOR",
    VIEWER: "VIEWER"
} as const;
export type Role = (typeof Role)[keyof typeof Role];
