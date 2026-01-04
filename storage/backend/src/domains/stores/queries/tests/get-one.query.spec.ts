import { Store } from "@/providers/stores/models/store.model";
import { StoreReadRepository } from "@/providers/stores/repositories/store.repository";
import { createMock } from "@golevelup/ts-jest";
import { NotFoundException } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { Test } from "@nestjs/testing";
import { StoreGetOneQuery, StoreGetOneQueryHandler } from "../get-one.query";

describe(StoreGetOneQuery.name, () => {
  const query = new StoreGetOneQuery(1);
  const sellerReader = createMock<StoreReadRepository>();
  const queryBus = createMock<QueryBus>({
    execute: async () => undefined,
  });

  let handler: StoreGetOneQueryHandler;

  const subject = () => handler.execute(query);

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        StoreGetOneQueryHandler,
        { provide: StoreReadRepository, useValue: sellerReader },
        { provide: QueryBus, useValue: queryBus },
      ],
    }).compile();

    handler = moduleRef.get(StoreGetOneQueryHandler);
  });

  it("should throw not found error when data is undefined", async () => {
    sellerReader.findById.mockResolvedValueOnce(undefined);
    await expect(subject()).rejects.toThrow(NotFoundException);
  });

  it("should return defined object", async () => {
    sellerReader.findById.mockResolvedValueOnce(new Store());
    const res = await subject();
    expect(res).toBeDefined();
  });
});
