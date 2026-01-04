import { Inject } from "@nestjs/common";
import { DbClientProvider } from "../modules/constants";

export const InjectDbClient = () => Inject(DbClientProvider);
