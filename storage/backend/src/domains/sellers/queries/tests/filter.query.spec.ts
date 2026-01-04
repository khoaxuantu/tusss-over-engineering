import { Seller } from "@/providers/sellers/models/seller.model";
import { SellerFilterRepository } from "@/providers/sellers/repositories/seller.repository";
import { createMock } from "@golevelup/ts-jest";
import { QueryBus } from "@nestjs/cqrs";
import { Test } from "@nestjs/testing";
import { Paginable, Pagination, PaginationResult } from "@tusss/core";
import { SellerFilterQuery, SellerFilterQueryHandler } from "../filter.query";

describe(SellerFilterQuery.name, () => {
  const paginationResult = new PaginationResult(new Pagination(), 0);
  const filter = createMock<SellerFilterRepository>({
    paginate: async () => new Paginable([], paginationResult),
  });
  const queryBus = createMock<QueryBus>({
    execute: async () => new Map(),
  });

  let handler: SellerFilterQueryHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        SellerFilterQueryHandler,
        { provide: SellerFilterRepository, useValue: filter },
        { provide: QueryBus, useValue: queryBus },
      ],
    }).compile();

    handler = moduleRef.get(SellerFilterQueryHandler);
  });

  it("should return result when found data", async () => {
    const res = new Paginable([new Seller()], paginationResult);
    filter.paginate.mockResolvedValueOnce(res);
    const query = new SellerFilterQuery({});
    const result = await handler.execute(query);
    expect(result).toBeDefined();
  });
});
