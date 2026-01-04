import { SellerLocationWriteRepository } from "@/domains/sellers-locations/repositories/seller-location.repository";
import { createMock } from "@golevelup/ts-jest";
import { InternalServerErrorException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { TestErrorMessage } from "@tusss/core";
import { SellerCreateRequest } from "../../dtos/request";
import { SellerWriteRepository } from "../../repositories/seller.repository";
import { SellerCreateCommand, SellerCreateCommandHandler } from "../create.command";

describe(SellerCreateCommand.name, () => {
  const cmd = new SellerCreateCommand(new SellerCreateRequest());
  const sellerWrite = createMock<SellerWriteRepository>({
    insertOne: async () => ({ id: 1 }),
    transaction: {
      execute: async (cb: () => Promise<any>) => {
        await cb();
      },
    },
  });
  const sellerLocationWrite = createMock<SellerLocationWriteRepository>();

  let handler: SellerCreateCommandHandler;

  const subject = () => handler.execute(cmd);

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        SellerCreateCommandHandler,
        { provide: SellerWriteRepository, useValue: sellerWrite },
        { provide: SellerLocationWriteRepository, useValue: sellerLocationWrite },
      ],
    }).compile();

    handler = moduleRef.get(SellerCreateCommandHandler);
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
