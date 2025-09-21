import { Injectable } from "@nestjs/common";
import { PasswordService } from "./password.service";

@Injectable()
export class TokenService {
  constructor(public readonly password: PasswordService) {}
}
