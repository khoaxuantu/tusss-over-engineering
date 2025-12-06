import { Paginable, PaginationResult } from "@/shared/models/pagination.model";
import { createMock } from "@golevelup/ts-jest";
import { Test } from "@nestjs/testing";
import { City } from "../../city.model";
import { CityReadRepository } from "../../city.repository";
import { CityFilterResponse } from "../../dtos/response";
import { CityFilterQuery, CityFilterQueryHandler } from "../filter.query";

describe(CityFilterQuery.name, () => {
  const reader = createMock<CityReadRepository>({
    paginate: async () =>
      new Paginable([new City()], new PaginationResult({ page: 1, perPage: 10, total: 1 })),
  });

  let handler: CityFilterQueryHandler;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [CityFilterQueryHandler, { provide: CityReadRepository, useValue: reader }],
    }).compile();

    handler = module.get<CityFilterQueryHandler>(CityFilterQueryHandler);
  });

  it("should filter cities", async () => {
    const res = await handler.execute(
      new CityFilterQuery({
        and: [{ id: { contain: "hanoi" } }, { name: { contain: "Hà Nội" } }],
      }),
    );
    expect(res).toBeInstanceOf(CityFilterResponse);
  });
});
