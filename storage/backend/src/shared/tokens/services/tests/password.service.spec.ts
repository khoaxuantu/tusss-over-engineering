import { Test } from "@nestjs/testing";
import { PasswordService } from "../password.service";

describe(PasswordService.name, () => {
  let service: PasswordService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PasswordService],
    }).compile();

    service = moduleRef.get(PasswordService);
  });

  test("one encryption round", async () => {
    const testPwd = "hfrohf$#$#$%%333";
    const encrypted = await service.hash(testPwd);
    const matched = await service.check(testPwd, encrypted);
    expect(matched).toBeTruthy();
  });
});
