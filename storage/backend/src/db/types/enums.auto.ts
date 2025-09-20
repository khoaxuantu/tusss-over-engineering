export const Role = {
    ADMIN: "ADMIN",
    EDITOR: "EDITOR",
    VIEWER: "VIEWER"
} as const;
export type Role = (typeof Role)[keyof typeof Role];
