import { Role } from "@/db/types/enums.auto";
import { UserTable } from "@/db/types/schemas.auto";
import { Expose, instanceToPlain, plainToInstance } from "class-transformer";
import { Selectable, Updateable } from "kysely";

interface UserRecord extends Omit<Selectable<UserTable>, "password"> {}

export class User implements UserRecord {
  @Expose()
  id: number = 0;

  @Expose()
  name: string = "";

  @Expose()
  roles: Role[] = [];

  @Expose()
  createdAt: Date = new Date();

  @Expose()
  updatedAt: Date = new Date();

  constructor(data?: User) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.roles = data.roles;
      this.createdAt = data.createdAt;
      this.updatedAt = data.updatedAt;
    }
  }

  static create(data?: Updateable<UserTable>) {
    return plainToInstance(User, data || {}, {
      excludeExtraneousValues: true,
      exposeDefaultValues: true,
    });
  }

  toPlain(): UserRecord {
    const obj = instanceToPlain(this);
    return obj as UserRecord;
  }
}
