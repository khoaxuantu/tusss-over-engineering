import { transformArrParams } from "../transform.helper";

class TestClass {
  a: string = "";
}

describe("transformArrParams", () => {
  test("transform a string", () => {
    const res = transformArrParams({ cls: String, value: "abc" });
    expect(res).toEqual(["abc"]);
  });

  test("transform an array of string", () => {
    const arr = ["a", "b", "c"];
    const res = transformArrParams({ cls: String, value: arr });
    expect(res).toEqual(arr);
  });

  test("transform a number", () => {
    const res = transformArrParams({ cls: Number, value: "1" });
    expect(res).toEqual([1]);
  });

  test("transform an array of number", () => {
    const arr = [1, 2, 3];
    const res = transformArrParams({ cls: Number, value: arr });
    expect(res).toEqual(arr);
  });

  test("transform an object", () => {
    const res = transformArrParams({ cls: TestClass, value: { a: "abc" } });
    expect(res[0]).toBeInstanceOf(TestClass);
    expect(res[0].a).toEqual("abc");
  });

  test("transform an array of object", () => {
    const res = transformArrParams({ cls: TestClass, value: [{ a: "abc" }, { a: "def" }] });
    expect(res).toHaveLength(2);
    res.forEach((obj) => expect(obj).toBeInstanceOf(TestClass));
  });
});
