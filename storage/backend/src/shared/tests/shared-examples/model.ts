import { ClassConstructor } from "@/shared/types/common";

interface TestModelCreateProps<T> {
  cls: ClassConstructor<T>;
  factories: {
    testBlankObject: (obj: {}) => T;
    testUndefined: (obj: undefined) => T;
  };
}

export function testModelCreate<T extends {}>(props: TestModelCreateProps<T>) {
  it("should be defined", () => {
    expect(new props.cls()).toBeDefined();
  });

  describe("static create", () => {
    it("should return an instance if blank object", () => {
      const obj = props.factories.testBlankObject({});
      expect(obj).toBeInstanceOf(props.cls);
      expect(obj).toMatchObject(new props.cls());
    });

    it("should return an instance if undefined", () => {
      const obj = props.factories.testUndefined(undefined);
      expect(obj).toBeInstanceOf(props.cls);
      expect(obj).toMatchObject(new props.cls());
    });
  });
}
