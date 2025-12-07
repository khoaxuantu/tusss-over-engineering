import { createMock } from "@golevelup/ts-jest";
import { NotFoundException } from "@nestjs/common";
import { District } from "../../district.model";
import { DistrictReadRepository } from "../../district.repository";
import { DistrictGetOneQuery, DistrictGetOneQueryHandler } from "../get-one.query";

describe(DistrictGetOneQueryHandler.name, () => {
  const repository = createMock<DistrictReadRepository>({
    findById: async () => new District(),
  });
  const command = new DistrictGetOneQuery("1");

  const handler = new DistrictGetOneQueryHandler(repository);

  it("should execute query", async () => {
    const res = await handler.execute(command);
    expect(res).toBeDefined();
  });

  it("should throw not found exception", async () => {
    repository.findById.mockResolvedValue(undefined);
    await expect(handler.execute(command)).rejects.toThrow(NotFoundException);
  });
});
