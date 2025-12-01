import { Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";

const SaltRounds = 12;

@Injectable()
export class PasswordService {
  constructor() {}

  hash(raw: string, saltRounds: number = SaltRounds) {
    return bcrypt.hash(raw, saltRounds ?? SaltRounds);
  }

  hashSync(raw: string, saltRounds: number = SaltRounds) {
    return bcrypt.hashSync(raw, saltRounds);
  }

  check(raw: string, encrypted: string) {
    return bcrypt.compare(raw, encrypted);
  }
}
