import { InjectDbClient } from "@/shared/db/decorators/inject-client.decorator";
import type { DbClient } from "@/shared/db/modules/types";
import { Injectable } from "@nestjs/common";
import { StoreLocationInsertModel } from "../models/store-location.model";

@Injectable()
export class StoreLocationWriteRepository {
  constructor(
    @InjectDbClient()
    private readonly db: DbClient,
  ) {}

  async insertOne(data: StoreLocationInsertModel) {
    await this.db.insertInto("storesLocations").values(data).executeTakeFirst();
  }
}
