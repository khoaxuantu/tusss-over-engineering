import { User } from "../user.model";

describe(User.name, () => {
  describe("toPlain", () => {
    it("should return correct plain object", () => {
      const doc = User.create();
      const plain = doc.toPlain();
      expect(plain).toMatchObject(doc);
      expect(plain).not.toHaveProperty("password");
    });
  });
});
