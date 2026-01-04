import { Role } from "@/shared/db/types/enums.auto";
import { UserTable } from "@/shared/db/types/schemas.auto";
import { UpdateObjBuilder } from "@/shared/repos/abstracts/updater.abstract";
import { TokenService } from "@/shared/tokens/services/token.service";
import { Updateable } from "kysely";

export class UserUpdateObjBuilder extends UpdateObjBuilder<Updateable<UserTable>> {
  constructor(private token: TokenService) {
    super();
  }

  setName(name: string) {
    this.activate();
    this.data.name = name;
    return this;
  }

  setRoles(roles: Role[]) {
    this.activate();
    this.data.roles = roles;
    return this;
  }

  setPwd(pwd: string, saltRounds?: number) {
    this.activate();
    this.data.password = this.token.password.hashSync(pwd, saltRounds);
    return this;
  }
}
