import { createMock } from "@golevelup/ts-jest";
import { CommandBus } from "@nestjs/cqrs";
import { Test } from "@nestjs/testing";
import { testExecution } from "@tusss/jest/examples";
import { SellerCreateRequest } from "../../dtos/request";
import { SellerController } from "../seller.controller";

describe(SellerController.name, () => {
  const commandBus = createMock<CommandBus>();

  let controller: SellerController;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [SellerController],
      providers: [{ provide: CommandBus, useValue: commandBus }],
    }).compile();

    controller = moduleRef.get<SellerController>(SellerController);
  });

  testExecution("create", async () => {
    const res = await controller.create(new SellerCreateRequest());
    expect(res).toBeDefined();
  });
});
