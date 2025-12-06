import { testCommandExecute, testQueryExecute } from "@/shared/tests/shared-examples/cqrs";
import { createMock } from "@golevelup/ts-jest";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Test } from "@nestjs/testing";
import { DistrictCreateCommand } from "../commands/create.command";
import { DistrictController } from "../district.controller";
import { DistrictCreateRequest, DistrictFilterRequest } from "../dtos/request";
import { DistrictFilterQuery } from "../queries/filter.query";
import { DistrictGetOneQuery } from "../queries/get-one.query";

describe(DistrictController.name, () => {
  const queryBus = createMock<QueryBus>();
  const commandBus = createMock<CommandBus>();

  let controller: DistrictController;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [DistrictController],
      providers: [
        { provide: QueryBus, useValue: queryBus },
        { provide: CommandBus, useValue: commandBus },
      ],
    }).compile();

    controller = module.get<DistrictController>(DistrictController);
  });

  testCommandExecute({
    label: "create",
    commandBusFactory: () => commandBus,
    commandFactory: () => expect.any(DistrictCreateCommand),
    subject: () => controller.create(new DistrictCreateRequest()),
  });

  testQueryExecute({
    label: "get one",
    queryBusFactory: () => queryBus,
    queryFactory: () => expect.any(DistrictGetOneQuery),
    subject: () => controller.getOne("1"),
  });

  testQueryExecute({
    label: "filter",
    queryBusFactory: () => queryBus,
    queryFactory: () => expect.any(DistrictFilterQuery),
    subject: () => controller.filter(new DistrictFilterRequest()),
  });
});
