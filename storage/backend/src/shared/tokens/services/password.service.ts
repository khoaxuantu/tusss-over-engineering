import { Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";

const SaltRounds = 12;

@Injectable()
export class PasswordService {
  constructor(private customSaltRounds?: number) {}

  get saltRounds() {
    return this.customSaltRounds || SaltRounds;
  }

  hash(raw: string) {
    return bcrypt.hash(raw, this.saltRounds);
  }

  hashSync(raw: string) {
    return bcrypt.hashSync(raw, this.saltRounds);
  }

  check(raw: string, encrypted: string) {
    return bcrypt.compare(raw, encrypted);
  }
}
