import { testModelCreate } from "@tusss/jest/examples";
import { Seller } from "../seller.model";

describe(Seller.name, () => {
  testModelCreate({
    cls: Seller,
    factories: {
      testBlankObject: (obj) => new Seller(obj),
      testUndefined: (obj) => Seller.create(obj),
    },
  });
});
