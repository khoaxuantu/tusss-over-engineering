import { testModelCreate } from "@/shared/tests/shared-examples/model";
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
