import { testQueryExecute } from "@/shared/tests/shared-examples/cqrs";
import { createMock } from "@golevelup/ts-jest";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Test } from "@nestjs/testing";
import { testExecution } from "@tusss/jest/examples";
import { StoreCreateRequest, StoreFilterRequest } from "../../dtos/request";
import { StoreFilterQuery } from "../../queries/filter.query";
import { StoreGetOneQuery } from "../../queries/get-one.query";
import { StoreController } from "../store.controller";

describe(StoreController.name, () => {
  const commandBus = createMock<CommandBus>();
  const queryBus = createMock<QueryBus>();

  let controller: StoreController;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [StoreController],
      providers: [
        { provide: CommandBus, useValue: commandBus },
        { provide: QueryBus, useValue: queryBus },
      ],
    }).compile();

    controller = moduleRef.get<StoreController>(StoreController);
  });

  testExecution("create", async () => {
    const res = await controller.create(new StoreCreateRequest());
    expect(res).toBeDefined();
  });

  testQueryExecute({
    label: "filter",
    queryBusFactory: () => queryBus,
    queryFactory: () => expect.any(StoreFilterQuery),
    subject: () => controller.filter(new StoreFilterRequest()),
  });

  testQueryExecute({
    label: "getOne",
    queryBusFactory: () => queryBus,
    queryFactory: () => expect.any(StoreGetOneQuery),
    subject: () => controller.getOne({ id: 1 }),
  });
});
