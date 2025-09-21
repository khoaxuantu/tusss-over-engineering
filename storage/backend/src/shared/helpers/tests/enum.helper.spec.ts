import { enumToArray } from "../enum.helper";

describe("EnumHelper", () => {
  describe("enumToArray", () => {
    test("string enum", () => {
      enum TEST {
        A = "a",
        B = "b",
        C = "c",
        D = "d",
        E = "e",
      }

      expect(enumToArray(TEST)).toEqual(["a", "b", "c", "d", "e"]);
    });

    test("number enum", () => {
      enum TEST {
        A = 0,
        B = 1,
        C = 2,
        D = 3,
        E = 4,
      }

      expect(enumToArray(TEST)).toEqual([0, 1, 2, 3, 4]);
    });

    test("raw enum", () => {
      enum TEST {
        A,
        B,
        C,
        D,
        E,
      }

      expect(enumToArray(TEST)).toEqual([0, 1, 2, 3, 4]);
    });
  });
});
