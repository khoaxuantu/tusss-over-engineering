import { SellerType } from "@/shared/db/types/enums.auto";
import { SellerUpdateBuilder } from "../update-obj.builder";

describe(SellerUpdateBuilder.name, () => {
  describe("setName", () => {
    it("should update", () => {
      const builder = new SellerUpdateBuilder().setName("test");
      expect(builder.build().name).toEqual("test");
    });
  });

  describe("setType", () => {
    it("should update", () => {
      const builder = new SellerUpdateBuilder().setType(SellerType.RETAIL);
      expect(builder.build().type).toEqual(SellerType.RETAIL);
    });
  });

  describe("setHref", () => {
    it("should update", () => {
      const builder = new SellerUpdateBuilder().setHref("test");
      expect(builder.build().href).toEqual("test");
    });
  });
});
