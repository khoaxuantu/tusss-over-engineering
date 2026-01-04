import { Store } from "@/providers/stores/models/store.model";
import { StoreFilterRepository } from "@/providers/stores/repositories/store.repository";
import { createMock } from "@golevelup/ts-jest";
import { QueryBus } from "@nestjs/cqrs";
import { Test } from "@nestjs/testing";
import { Paginable, Pagination, PaginationResult } from "@tusss/core";
import { StoreFilterQuery, StoreFilterQueryHandler } from "../filter.query";

describe(StoreFilterQuery.name, () => {
  const paginationResult = new PaginationResult(new Pagination(), 0);
  const filter = createMock<StoreFilterRepository>({
    paginate: async () => new Paginable([], paginationResult),
  });
  const queryBus = createMock<QueryBus>({
    execute: async () => new Map(),
  });

  let handler: StoreFilterQueryHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        StoreFilterQueryHandler,
        { provide: StoreFilterRepository, useValue: filter },
        { provide: QueryBus, useValue: queryBus },
      ],
    }).compile();

    handler = moduleRef.get(StoreFilterQueryHandler);
  });

  it("should return result when found data", async () => {
    const res = new Paginable([new Store()], paginationResult);
    filter.paginate.mockResolvedValueOnce(res);
    const query = new StoreFilterQuery({});
    const result = await handler.execute(query);
    expect(result).toBeDefined();
  });
});
