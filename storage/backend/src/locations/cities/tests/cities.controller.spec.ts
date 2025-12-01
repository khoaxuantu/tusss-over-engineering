import { testCommandExecute, testQueryExecute } from "@/shared/tests/shared-examples/cqrs";
import { createMock } from "@golevelup/ts-jest";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Test, TestingModule } from "@nestjs/testing";
import { CityController } from "../city.controller";
import { CityCreateCommand } from "../commands/create.command";
import { CityCreateRequest } from "../dtos/request";
import { CityGetOneQuery } from "../queries/get-one.query";

describe("CityController", () => {
  const commandBus = createMock<CommandBus>();
  const queryBus = createMock<QueryBus>();

  let controller: CityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CityController],
      providers: [
        { provide: CommandBus, useValue: commandBus },
        { provide: QueryBus, useValue: queryBus },
      ],
    }).compile();

    controller = module.get<CityController>(CityController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  testCommandExecute({
    label: "create",
    commandBusFactory: () => commandBus,
    commandFactory: () => expect.any(CityCreateCommand),
    subject: () => controller.create(new CityCreateRequest()),
  });

  testQueryExecute({
    label: "getOne",
    queryBusFactory: () => queryBus,
    queryFactory: () => expect.any(CityGetOneQuery),
    subject: () => controller.getOne("1"),
  });
});
