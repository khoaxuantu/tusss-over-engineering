import { Role } from "@/db/types/enums.auto";
import { AdminTable } from "@/db/types/schemas.auto";
import { instanceToPlain } from "class-transformer";
import { Selectable, Updateable } from "kysely";

interface AdminRecord extends Selectable<AdminTable> {}

export class Admin implements AdminRecord {
  id: number = 0;
  name: string = "";
  password: string = "";
  roles: Role[] = [];

  constructor(data?: Admin) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.password = data.password;
      this.roles = data.roles;
    }
  }

  static create(data?: Updateable<AdminTable>) {
    const obj = new Admin();
    Object.assign(obj, data);
    return obj;
  }

  toPlain(): AdminRecord {
    const obj = instanceToPlain(this);
    return obj as AdminRecord;
  }
}
