import { Role } from "@/db/types/enums.auto";
import { enumToArray } from "@/shared/helpers/enum.helper";
import { UserExternalEnum } from "@/users/constants";
import { User } from "@/users/schemas/user.schema";
import { ApiProperty } from "@nestjs/swagger";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { ArrayMinSize, IsArray, IsNotEmpty } from "class-validator";

export class UserIdentifier {
  @ApiProperty()
  @IsNotEmpty()
  id: number = 0;

  @ApiProperty()
  @IsNotEmpty()
  name: string = "";

  @ApiProperty({ enum: enumToArray(Role), enumName: UserExternalEnum.roles })
  @IsArray()
  @ArrayMinSize(1)
  roles: Role[] = [];

  constructor(data?: UserIdentifier) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.roles = data.roles;
    }
  }

  static create(data: Partial<UserIdentifier> = {}) {
    return plainToInstance(UserIdentifier, data, { exposeDefaultValues: true });
  }

  static fromUser(user: User) {
    return new UserIdentifier({
      id: user.id,
      name: user.name,
      roles: user.roles,
    });
  }

  static toPlain(payload: UserIdentifier) {
    return instanceToPlain(payload) as UserIdentifier;
  }
}
