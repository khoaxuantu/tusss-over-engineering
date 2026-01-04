import { Seller } from "@/providers/sellers/models/seller.model";
import { SellerReadRepository } from "@/providers/sellers/repositories/seller.repository";
import { createMock } from "@golevelup/ts-jest";
import { NotFoundException } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { Test } from "@nestjs/testing";
import { SellerGetOneQuery, SellerGetOneQueryHandler } from "../get-one.query";

describe(SellerGetOneQuery.name, () => {
  const query = new SellerGetOneQuery(1);
  const sellerReader = createMock<SellerReadRepository>();
  const queryBus = createMock<QueryBus>({
    execute: async () => undefined,
  });

  let handler: SellerGetOneQueryHandler;

  const subject = () => handler.execute(query);

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        SellerGetOneQueryHandler,
        { provide: SellerReadRepository, useValue: sellerReader },
        { provide: QueryBus, useValue: queryBus },
      ],
    }).compile();

    handler = moduleRef.get(SellerGetOneQueryHandler);
  });

  it("should throw not found error when data is undefined", async () => {
    sellerReader.findById.mockResolvedValueOnce(undefined);
    await expect(subject()).rejects.toThrow(NotFoundException);
  });

  it("should return defined object", async () => {
    sellerReader.findById.mockResolvedValueOnce(new Seller());
    const res = await subject();
    expect(res).toBeDefined();
  });
});
