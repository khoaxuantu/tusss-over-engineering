import { InternalServerErrorException } from "@nestjs/common";
import { Command, CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CommonMessage } from "@tusss/core";
import { CityInsert } from "../city.model";
import { CityWriteRepository } from "../city.repository";
import { CityCreateRequest } from "../dtos/request";

export class CityCreateCommand extends Command<string> {
  readonly payload: CityCreateRequest;

  constructor(payload: CityCreateRequest) {
    super();
    this.payload = payload;
  }
}

@CommandHandler(CityCreateCommand)
export class CityCreateCommandHandler implements ICommandHandler<CityCreateCommand> {
  constructor(private cityRepo: CityWriteRepository) {}

  async execute(command: CityCreateCommand): Promise<string> {
    const city = new CityInsert({
      name: command.payload.name,
      id: command.payload.id,
    });

    const newRecord = await this.cityRepo.insertOne(city);

    if (!newRecord) throw new InternalServerErrorException(CommonMessage.error.create);

    return newRecord.id;
  }
}
