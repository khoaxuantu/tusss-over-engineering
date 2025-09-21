import { parsePgArray } from "../parser";

describe("parsePgArray", () => {
  test("empty array", () => {
    expect(parsePgArray("{}")).toEqual([]);
  });

  test("enum array", () => {
    expect(parsePgArray("{a,b,c}")).toEqual(["a", "b", "c"]);
  });
});
