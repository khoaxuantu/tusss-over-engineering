import { Role } from "@/db/types/enums.auto";
import { AdminTable } from "@/db/types/schemas.auto";
import { Expose, instanceToPlain, plainToInstance } from "class-transformer";
import { Selectable, Updateable } from "kysely";

interface AdminRecord extends Omit<Selectable<AdminTable>, "password"> {}

export class Admin implements AdminRecord {
  @Expose()
  id: number = 0;

  @Expose()
  name: string = "";

  @Expose()
  roles: Role[] = [];

  constructor(data?: Admin) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.roles = data.roles;
    }
  }

  static create(data?: Updateable<AdminTable>) {
    return plainToInstance(Admin, data || {}, {
      excludeExtraneousValues: true,
      exposeDefaultValues: true,
    });
  }

  toPlain(): AdminRecord {
    const obj = instanceToPlain(this);
    return obj as AdminRecord;
  }
}
