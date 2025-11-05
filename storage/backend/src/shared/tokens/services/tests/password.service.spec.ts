import { PasswordService } from "../password.service";

describe(PasswordService.name, () => {
  let service: PasswordService;

  beforeAll(async () => {
    service = new PasswordService();
  });

  test("one encryption round", async () => {
    const testPwd = "hfrohf$#$#$%%333";
    const encrypted = await service.hash(testPwd);
    const matched = await service.check(testPwd, encrypted);
    expect(matched).toBeTruthy();
  });

  test("empty password check", async () => {
    const testPwd = "";
    const encrypted = await service.hash("encryped");
    const matched = await service.check(testPwd, encrypted);
    expect(matched).toBeFalsy();
  });
});
