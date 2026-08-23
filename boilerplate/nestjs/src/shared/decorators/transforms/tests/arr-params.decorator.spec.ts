import { plainToInstance } from "class-transformer";
import { TransformArrParams } from "../arr-params.decorator";

class TestClass {
  @TransformArrParams(String)
  test: string[] = [];
}

describe("TransformArrParams", () => {
  test("single", () => {
    const obj = plainToInstance(TestClass, { test: "abc" });
    expect(obj.test).toEqual(["abc"]);
  });

  test("array", () => {
    const obj = plainToInstance(TestClass, { test: ["abc", "def"] });
    expect(obj.test).toEqual(["abc", "def"]);
  });
});
