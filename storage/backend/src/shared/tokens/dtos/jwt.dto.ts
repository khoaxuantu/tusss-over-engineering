import { Role } from "@/db/types/enums.auto";
import { enumToArray } from "@/shared/helpers/enum.helper";
import { UserExternalEnum } from "@/users/constants";
import { User } from "@/users/schemas/user.schema";
import { ApiProperty } from "@nestjs/swagger";
import { instanceToPlain, plainToInstance } from "class-transformer";

export class UserJwtPayload {
  @ApiProperty()
  id: number = 0;

  @ApiProperty()
  name: string = "";

  @ApiProperty({ enum: enumToArray(Role), enumName: UserExternalEnum.roles })
  roles: Role[] = [];

  constructor(data?: UserJwtPayload) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.roles = data.roles;
    }
  }

  static create(data: Partial<UserJwtPayload> = {}) {
    return plainToInstance(UserJwtPayload, data, { exposeDefaultValues: true });
  }

  static fromUser(user: User) {
    return new UserJwtPayload({
      id: user.id,
      name: user.name,
      roles: user.roles,
    });
  }

  static toPlain(payload: UserJwtPayload) {
    return instanceToPlain(payload) as UserJwtPayload;
  }
}
