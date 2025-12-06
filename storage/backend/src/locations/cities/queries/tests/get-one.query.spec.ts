import { createMock } from "@golevelup/ts-jest";
import { NotFoundException } from "@nestjs/common";
import { City } from "../../city.model";
import { CityReadRepository } from "../../city.repository";
import { CityGetOneQuery, CityGetOneQueryHandler } from "../get-one.query";

describe(CityGetOneQuery.name, () => {
  const reader = createMock<CityReadRepository>();

  let handler: CityGetOneQueryHandler;

  beforeAll(async () => {
    handler = new CityGetOneQueryHandler(reader);
  });

  it("should throw error if not found", async () => {
    reader.findById.mockResolvedValue(undefined);
    await expect(handler.execute(new CityGetOneQuery("1"))).rejects.toThrow(NotFoundException);
  });

  it("should return object if found", async () => {
    reader.findById.mockResolvedValue(new City());
    const res = await handler.execute(new CityGetOneQuery("1"));
    expect(res).toBeDefined();
  });
});
