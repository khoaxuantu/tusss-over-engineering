import { Paginable, PaginationResult } from "@/shared/models/pagination.model";
import { createMock } from "@golevelup/ts-jest";
import { Test } from "@nestjs/testing";
import { District } from "../../district.model";
import { DistrictReadRepository } from "../../district.repository";
import { DistrictFilterResponse } from "../../dtos/response";
import { DistrictFilterQuery, DistrictFilterQueryHandler } from "../filter.query";

describe(DistrictFilterQuery.name, () => {
  const reader = createMock<DistrictReadRepository>({
    paginate: async () =>
      new Paginable([new District()], new PaginationResult({ page: 1, perPage: 10, total: 1 })),
  });

  let handler: DistrictFilterQueryHandler;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DistrictFilterQueryHandler,
        { provide: DistrictReadRepository, useValue: reader },
      ],
    }).compile();

    handler = module.get<DistrictFilterQueryHandler>(DistrictFilterQueryHandler);
  });

  it("should filter cities", async () => {
    const res = await handler.execute(
      new DistrictFilterQuery({
        and: [{ id: { contain: "hanoi" } }, { name: { contain: "Hà Nội" } }],
      }),
    );
    expect(res).toBeInstanceOf(DistrictFilterResponse);
  });
});
