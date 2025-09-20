import { Admin } from "../admin.schema";

describe(Admin.name, () => {
  describe("toPlain", () => {
    it("should return correct plain object", () => {
      const doc = Admin.create();
      const plain = doc.toPlain();
      expect(plain).toMatchObject(doc);
    });
  });
});
