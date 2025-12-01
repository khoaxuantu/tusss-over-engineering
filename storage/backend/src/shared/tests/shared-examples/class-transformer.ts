import { ClassConstructor, plainToInstance } from "class-transformer";

interface TestTransformValuesProps<T> {
  cls: ClassConstructor<T>;
  plainObj: Partial<Record<keyof T, any>>;
  expectedObj: Partial<Record<keyof T, any>>;
}

export function testTransformValues<T>({
  cls,
  plainObj,
  expectedObj,
}: TestTransformValuesProps<T>) {
  it("should parse value", () => {
    const obj = plainToInstance(cls, plainObj);

    Object.entries(expectedObj).forEach(([key, value]) => {
      expect(obj[key]).toEqual(value);
    });
  });
}
