import { describe, expect, it, test } from "bun:test";
import { diffAttrsOfTwoObjs, sanitizeArray, sanitizeObject } from "../object.helper";

describe("sanitizeObject", () => {
  it("should keeps the Date object", () => {
    const obj = { a: new Date() };
    const result = sanitizeObject(obj);
    expect(result.a).toBeInstanceOf(Date);
  });

  it("should sanitize the array property", () => {
    const obj = { a: [1, 2, 3, undefined, { b: undefined, c: 1 }, [undefined, 2, [undefined, 3]]] };
    const result = sanitizeObject(obj);
    expect<any>(result.a).toEqual([1, 2, 3, { c: 1 }, [2, [3]]]);
    expect(result.a[3]).not.toHaveProperty("b");
  });

  it("should skip function property", () => {
    const obj = { a: () => {}, b: { c: () => {} }, d: [1, () => {}, 3] };
    const result = sanitizeObject(obj);
    expect(result).toMatchObject({ d: [1, 3] });
    expect(result).not.toHaveProperty("a");
    expect(result.b).not.toHaveProperty("c");
  });

  it("should skip symbol property", () => {
    const obj = { a: Symbol("a"), b: { c: Symbol("c") }, d: 1, e: [Symbol("e"), 2] };
    const result = sanitizeObject(obj);
    expect(result).toMatchObject({ d: 1, e: [2] });
    expect(result).not.toHaveProperty("a");
    expect(result.b).not.toHaveProperty("c");
  });

  it("should sanitize nested objects", () => {
    const obj = { a: { b: { c: 1, d: undefined }, b1: undefined }, a1: undefined };
    const result = sanitizeObject(obj);
    expect(result).toMatchObject({ a: { b: { c: 1 } } });
    expect(result).not.toHaveProperty("a1");
    expect(result.a).not.toHaveProperty("b1");
    expect(result.a.b).not.toHaveProperty("d");
  });
});

describe("sanitizeArray", () => {
  it("should sanitize your array", () => {
    const arr = [1, 2, 3, undefined, () => {}, Symbol("a")];
    const result = sanitizeArray(arr);
    expect(result).toEqual([1, 2, 3]);
    expect(result).toHaveLength(3);
  });

  it("should sanitize nested arrays", () => {
    const arr = [1, 2, 3, undefined, [undefined, 2, [undefined, 3]]];
    const result = sanitizeArray(arr);
    expect(result).toEqual([1, 2, 3, [2, [3]]]);
    expect(result).toHaveLength(4);
    expect(result[3]).toHaveLength(2);
    expect(result[3][1]).toHaveLength(1);
  });

  it("should sanitize nested objects", () => {
    const arr = [1, 2, 3, undefined, { a: undefined, b: 1, c: [1, 2, 3, undefined] }];
    const result = sanitizeArray(arr);
    expect(result).toEqual([1, 2, 3, { b: 1, c: [1, 2, 3] }]);
    expect(result).toHaveLength(4);
    expect(result[3]).not.toHaveProperty("a");
    expect(result[3].c).toHaveLength(3);
  });
});

describe("diffAttrsOfTwoObjs", () => {
  test("normal cases", () => {
    const obj = diffAttrsOfTwoObjs(
      { a: 2, a1: 3, b: "a", "c.0": true },
      { a: 2, a1: 4, b: "b", "c.0": false }
    );
    expect(obj).not.toHaveProperty("a");
    expect(obj).toMatchObject({
      "c.0": { before: true, after: false },
      b: { before: "a", after: "b" },
      a1: { before: 3, after: 4 },
    });
  });

  test("edge cases", () => {
    const obj = diffAttrsOfTwoObjs(
      { d: "d", arr: [], arrDiff: [], arrDelete: [2] },
      { e: "e", f: null, arr: [], arrDiff: [1], arrNew: [2] }
    );

    expect(obj).not.toHaveProperty("arr");
    expect(obj).toMatchObject({
      d: { before: "d" },
      e: { after: "e" },
      arrDiff: { before: [], after: [1] },
      arrNew: { after: [2] },
      arrDelete: { before: [2] },
    });
  });
});
