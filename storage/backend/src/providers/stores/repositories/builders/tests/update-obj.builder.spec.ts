import { StoreType } from "@/shared/db/types/enums.auto";
import { StoreUpdateBuilder } from "../update-obj.builder";

describe(StoreUpdateBuilder.name, () => {
  describe("setName", () => {
    it("should update", () => {
      const builder = new StoreUpdateBuilder().setName("test");
      expect(builder.build().name).toEqual("test");
    });
  });

  describe("setType", () => {
    it("should update", () => {
      const builder = new StoreUpdateBuilder().setType(StoreType.RETAIL);
      expect(builder.build().type).toEqual(StoreType.RETAIL);
    });
  });

  describe("setHref", () => {
    it("should update", () => {
      const builder = new StoreUpdateBuilder().setHref("test");
      expect(builder.build().href).toEqual("test");
    });
  });
});
