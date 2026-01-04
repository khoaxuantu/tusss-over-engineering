import { testQueryExecute } from "@/shared/tests/shared-examples/cqrs";
import { createMock } from "@golevelup/ts-jest";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Test } from "@nestjs/testing";
import { testExecution } from "@tusss/jest/examples";
import { SellerCreateRequest, SellerFilterRequest } from "../../dtos/request";
import { SellerFilterQuery } from "../../queries/filter.query";
import { SellerGetOneQuery } from "../../queries/get-one.query";
import { SellerController } from "../seller.controller";

describe(SellerController.name, () => {
  const commandBus = createMock<CommandBus>();
  const queryBus = createMock<QueryBus>();

  let controller: SellerController;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [SellerController],
      providers: [
        { provide: CommandBus, useValue: commandBus },
        { provide: QueryBus, useValue: queryBus },
      ],
    }).compile();

    controller = moduleRef.get<SellerController>(SellerController);
  });

  testExecution("create", async () => {
    const res = await controller.create(new SellerCreateRequest());
    expect(res).toBeDefined();
  });

  testQueryExecute({
    label: "filter",
    queryBusFactory: () => queryBus,
    queryFactory: () => expect.any(SellerFilterQuery),
    subject: () => controller.filter(new SellerFilterRequest()),
  });

  testQueryExecute({
    label: "getOne",
    queryBusFactory: () => queryBus,
    queryFactory: () => expect.any(SellerGetOneQuery),
    subject: () => controller.getOne({ id: 1 }),
  });
});
