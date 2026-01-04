import { InjectDbClient } from "@/shared/db/decorators/inject-client.decorator";
import type { DbClient } from "@/shared/db/modules/types";
import { Injectable } from "@nestjs/common";
import { SellerLocationInsertModel } from "../models/seller-location.model";

@Injectable()
export class SellerLocationWriteRepository {
  constructor(
    @InjectDbClient()
    private readonly db: DbClient,
  ) {}

  async insertOne(data: SellerLocationInsertModel) {
    await this.db.insertInto("sellersLocations").values(data).executeTakeFirst();
  }
}
