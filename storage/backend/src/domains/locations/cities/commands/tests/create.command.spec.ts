import { createMock } from "@golevelup/ts-jest";
import { Test } from "@nestjs/testing";
import { CityWriteRepository } from "../../city.repository";
import { CityCreateCommand, CityCreateCommandHandler } from "../create.command";

describe(CityCreateCommand.name, () => {
  const cmd = new CityCreateCommand({ id: "test", name: "Test" });
  const repository = createMock<CityWriteRepository>({
    insertOne: async () => undefined,
  });

  let handler: CityCreateCommandHandler;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [CityCreateCommandHandler, { provide: CityWriteRepository, useValue: repository }],
    }).compile();

    handler = moduleRef.get<CityCreateCommandHandler>(CityCreateCommandHandler);
  });

  it("should throw error if create return null", async () => {
    await expect(handler.execute(cmd)).rejects.toThrow();
  });

  it("should return new id if create success", async () => {
    repository.insertOne.mockResolvedValueOnce({ id: "ascbd" });
    const res = await handler.execute(cmd);
    expect(res).toBe("ascbd");
  });
});
