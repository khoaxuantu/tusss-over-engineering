import { StoreLocationInsert } from "@/providers/stores-locations/models/store-location.model";
import { StoreLocationWriteRepository } from "@/providers/stores-locations/repositories/store-location.repository";
import { StoreInsert } from "@/providers/stores/models/store.model";
import { StoreWriteRepository } from "@/providers/stores/repositories/store.repository";
import { InternalServerErrorException } from "@nestjs/common";
import { Command, CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CommonMessage } from "@tusss/core";
import { ResourceCreateResponse } from "@tusss/nestjs";
import { StoreCreateRequest } from "../dtos/request";

export class StoreCreateCommand extends Command<ResourceCreateResponse> {
  constructor(readonly body: StoreCreateRequest) {
    super();
  }
}

@CommandHandler(StoreCreateCommand)
export class StoreCreateCommandHandler implements ICommandHandler<StoreCreateCommand> {
  constructor(
    private readonly sellerWrite: StoreWriteRepository,
    private readonly sellerLocationWrite: StoreLocationWriteRepository,
  ) {}

  async execute(command: StoreCreateCommand): Promise<ResourceCreateResponse> {
    const transaction = this.sellerWrite.transaction;

    const res = await transaction
      .execute(async () => {
        const res = await this.sellerWrite.insertOne(
          StoreInsert.create({
            name: command.body.name,
            type: command.body.type,
            href: command.body.href,
          }),
        );

        if (!res) throw new InternalServerErrorException(CommonMessage.error.create);

        await this.sellerLocationWrite.insertOne(
          StoreLocationInsert.create({
            cityId: command.body.city_id,
            districtId: command.body.district_id,
            storeId: res.id,
          }),
        );
        return new ResourceCreateResponse(String(res.id), res.id);
      })
      .catch(() => {
        throw new InternalServerErrorException(CommonMessage.error.create);
      });

    return res;
  }
}
