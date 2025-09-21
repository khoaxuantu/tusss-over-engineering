import { Injectable } from "@nestjs/common";
import { TusssJwtService } from "./jwt.service";
import { PasswordService } from "./password.service";

@Injectable()
export class TokenService {
  constructor(
    public readonly password: PasswordService,
    public readonly jwt: TusssJwtService,
  ) {}
}
