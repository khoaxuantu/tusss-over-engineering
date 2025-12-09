import { testModelCreate } from "@tusss/jest/examples";
import { Item, ItemInsert } from "../item.model";

describe(Item.name, () => {
  testModelCreate({
    cls: Item,
    factories: {
      testBlankObject: (obj) => Item.create(obj),
      testUndefined: (obj) => Item.create(obj),
    },
  });

  describe("toPlain", () => {
    it("should reutrn a plain object", () => {
      const obj = Item.create({ id: 1 });
      const plain = Item.toPlain(obj);
      expect(plain).not.toBeInstanceOf(Item);
      expect(plain.id).toEqual(1);
    });
  });
});

describe(ItemInsert.name, () => {
  testModelCreate({
    cls: ItemInsert,
    factories: {
      testBlankObject: (obj) => ItemInsert.create(obj),
      testUndefined: (obj) => ItemInsert.create(obj),
    },
  });

  describe("static toPlain", () => {
    it("should return a plain object", () => {
      const obj = ItemInsert.toPlain(ItemInsert.create({ name: "a" }));
      expect(obj.name).toEqual("a");
      expect(obj).not.toBeInstanceOf(ItemInsert);
    });
  });
});
