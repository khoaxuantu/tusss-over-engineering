import { SellerLocationInsert } from "@/providers/sellers-locations/models/seller-location.model";
import { SellerLocationWriteRepository } from "@/providers/sellers-locations/repositories/seller-location.repository";
import { SellerInsert } from "@/providers/sellers/models/seller.model";
import { SellerWriteRepository } from "@/providers/sellers/repositories/seller.repository";
import { InternalServerErrorException } from "@nestjs/common";
import { Command, CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CommonMessage } from "@tusss/core";
import { ResourceCreateResponse } from "@tusss/nestjs";
import { SellerCreateRequest } from "../dtos/request";

export class SellerCreateCommand extends Command<ResourceCreateResponse> {
  constructor(readonly body: SellerCreateRequest) {
    super();
  }
}

@CommandHandler(SellerCreateCommand)
export class SellerCreateCommandHandler implements ICommandHandler<SellerCreateCommand> {
  constructor(
    private readonly sellerWrite: SellerWriteRepository,
    private readonly sellerLocationWrite: SellerLocationWriteRepository,
  ) {}

  async execute(command: SellerCreateCommand): Promise<ResourceCreateResponse> {
    const transaction = this.sellerWrite.transaction;

    const res = await transaction
      .execute(async () => {
        const res = await this.sellerWrite.insertOne(
          SellerInsert.create({
            name: command.body.name,
            type: command.body.type,
            href: command.body.href,
          }),
        );

        if (!res) throw new InternalServerErrorException(CommonMessage.error.create);

        await this.sellerLocationWrite.insertOne(
          SellerLocationInsert.create({
            cityId: command.body.city_id,
            districtId: command.body.district_id,
            sellerId: res.id,
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
