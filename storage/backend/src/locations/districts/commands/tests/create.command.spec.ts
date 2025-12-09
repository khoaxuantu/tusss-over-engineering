import { createMock } from "@golevelup/ts-jest";
import { testSuccess } from "@tusss/jest/examples";
import { DistrictWriteRepository } from "../../district.repository";
import { DistrictCreateRequest } from "../../dtos/request";
import { DistrictCreateCommand, DistrictCreateCommandHandler } from "../create.command";

describe(DistrictCreateCommand.name, () => {
  const repository = createMock<DistrictWriteRepository>({
    insertOne: async () => ({ id: "1" }),
  });
  const command = new DistrictCreateCommand(new DistrictCreateRequest());
  const handler = new DistrictCreateCommandHandler(repository);

  testSuccess({
    subject: () => handler.execute(command),
  });

  it("should throw error if create failed", async () => {
    repository.insertOne.mockResolvedValueOnce(undefined);
    await expect(() => handler.execute(command)).rejects.toThrow();
  });
});
