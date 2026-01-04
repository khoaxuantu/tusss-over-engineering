import { SetMetadata } from "@nestjs/common";
import { IsPublicKey } from "../constants";

export function Public() {
  return SetMetadata(IsPublicKey, true);
}
