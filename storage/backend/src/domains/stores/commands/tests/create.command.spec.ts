import { StoreLocationWriteRepository } from "@/providers/stores-locations/repositories/store-location.repository";
import { StoreWriteRepository } from "@/providers/stores/repositories/store.repository";
import { createMock } from "@golevelup/ts-jest";
import { InternalServerErrorException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { TestErrorMessage } from "@tusss/core";
import { StoreCreateRequest } from "../../dtos/request";
import { StoreCreateCommand, StoreCreateCommandHandler } from "../create.command";

describe(StoreCreateCommand.name, () => {
  const cmd = new StoreCreateCommand(new StoreCreateRequest());
  const sellerWrite = createMock<StoreWriteRepository>({
    insertOne: async () => ({ id: 1 }),
    transaction: {
      execute: async (cb: () => Promise<any>) => {
        await cb();
      },
    },
  });
  const sellerLocationWrite = createMock<StoreLocationWriteRepository>();

  let handler: StoreCreateCommandHandler;

  const subject = () => handler.execute(cmd);

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        StoreCreateCommandHandler,
        { provide: StoreWriteRepository, useValue: sellerWrite },
        { provide: StoreLocationWriteRepository, useValue: sellerLocationWrite },
      ],
    }).compile();

    handler = moduleRef.get(StoreCreateCommandHandler);
  });

  it("should catch & throw internal server error", async () => {
    sellerWrite.insertOne.mockRejectedValueOnce(new Error(TestErrorMessage));
    await expect(subject()).rejects.toThrow(InternalServerErrorException);
  });

  it("should throw when insert seller failed", async () => {
    sellerWrite.insertOne.mockResolvedValueOnce(undefined);
    await expect(subject()).rejects.toThrow(InternalServerErrorException);
  });

  it("should insert to correct tables", async () => {
    sellerWrite.insertOne.mockClear();
    sellerLocationWrite.insertOne.mockClear();
    await subject();
    expect(sellerWrite.insertOne).toHaveBeenCalledTimes(1);
    expect(sellerLocationWrite.insertOne).toHaveBeenCalledTimes(1);
  });
});
