import { Injectable } from "@nestjs/common";
import bcrypt from "bcrypt";

const SaltRounds = 10;

@Injectable()
export class PasswordService {
  hash(raw: string) {
    return bcrypt.hash(raw, SaltRounds);
  }

  check(raw: string, encrypted: string) {
    return bcrypt.compare(raw, encrypted);
  }
}
