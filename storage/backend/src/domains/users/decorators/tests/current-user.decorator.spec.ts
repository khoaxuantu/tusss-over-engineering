import { User } from "@/domains/users/models/user.model";
import { createMock } from "@golevelup/ts-jest";
import { ExecutionContext } from "@nestjs/common";
import { extractUserContext } from "../current-user.decorator";

describe("extractCurrentUser", () => {
  test("user exists", () => {
    const ctx = createMock<ExecutionContext>({
      switchToHttp: () => {
        return {
          getRequest: () => ({
            user: User.create(),
          }),
        };
      },
    });

    expect(extractUserContext(null, ctx)).toBeDefined();
  });

  test("user doesn't exist", () => {
    const ctx = createMock<ExecutionContext>({
      switchToHttp: () => {
        return {
          getRequest: () => ({}),
        };
      },
    });

    expect(extractUserContext(null, ctx)).toBeUndefined();
  });
});
