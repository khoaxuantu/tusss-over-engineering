import { ItemUpdateObjBuilder } from "../update-obj.builder";

describe(ItemUpdateObjBuilder.name, () => {
  describe("setName", () => {
    it("should set correct value", () => {
      const builder = new ItemUpdateObjBuilder();
      builder.setName("a");
      expect(builder.build().name).toEqual("a");
    });
  });

  describe("setPrice", () => {
    it("should set correct value", () => {
      const builder = new ItemUpdateObjBuilder();
      builder.setPrice(1);
      expect(builder.build().price).toEqual(1);
    });
  });

  describe("setDescription", () => {
    it("should set correct value", () => {
      const builder = new ItemUpdateObjBuilder();
      builder.setDescription("a");
      expect(builder.build().description).toEqual("a");
    });
  });

  describe("setHref", () => {
    it("should set correct value", () => {
      const builder = new ItemUpdateObjBuilder();
      builder.setHref("a");
      expect(builder.build().href).toEqual("a");
    });
  });

  describe("setArchived", () => {
    it("should set correct value", () => {
      const builder = new ItemUpdateObjBuilder();
      builder.setArchived(true);
      expect(builder.build().archived).toEqual(true);
    });
  });
});
