import { CommonMessage } from "@/shared/constants";
import { CommonResponse } from "@/shared/dtos/response";
import { InternalServerErrorException } from "@nestjs/common";
import { Command, CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DistrictInsert } from "../district.model";
import { DistrictWriteRepository } from "../district.repository";
import { DistrictCreateRequest } from "../dtos/request";

export class DistrictCreateCommand extends Command<CommonResponse> {
  constructor(readonly body: DistrictCreateRequest) {
    super();
  }
}

@CommandHandler(DistrictCreateCommand)
export class DistrictCreateCommandHandler implements ICommandHandler<DistrictCreateCommand> {
  constructor(private readonly repository: DistrictWriteRepository) {}

  async execute(command: DistrictCreateCommand): Promise<CommonResponse> {
    const data = DistrictInsert.create(command.body);
    const res = await this.repository.insertOne(data);
    if (!res) throw new InternalServerErrorException(CommonMessage.error.create);
    return new CommonResponse(CommonMessage.ok.create);
  }
}
