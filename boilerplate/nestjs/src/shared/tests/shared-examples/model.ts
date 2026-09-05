import { ClassConstructor } from "@/shared/types";

export function testBlankConstructor(cls: ClassConstructor<any>) {
  test("blank constructor", () => {
    expect(new cls()).toBeDefined();
    expect(new cls(null)).toBeDefined();
    expect(new cls({})).toBeDefined();
  });
}
