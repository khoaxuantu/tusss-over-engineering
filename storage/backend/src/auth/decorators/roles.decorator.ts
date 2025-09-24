import { Role } from "@/db/types/enums.auto";
import { SetMetadata } from "@nestjs/common";

export const RolesKey = "roles.key";
export const Roles = (...roles: Role[]) => SetMetadata(RolesKey, roles);
