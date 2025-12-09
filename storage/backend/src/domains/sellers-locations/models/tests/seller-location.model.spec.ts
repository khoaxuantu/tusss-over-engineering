import { testModelCreate } from "@tusss/jest/examples";
import { SellerLocationInsert } from "../seller-location.model";

describe(SellerLocationInsert.name, () => {
  testModelCreate({
    cls: SellerLocationInsert,
    factories: {
      testBlankObject: () => new SellerLocationInsert({}),
      testUndefined: () => SellerLocationInsert.create(),
    },
  });
});

describe(SellerLocationInsert.name, () => {
  testModelCreate({
    cls: SellerLocationInsert,
    factories: {
      testBlankObject: () => new SellerLocationInsert({}),
      testUndefined: () => SellerLocationInsert.create(),
    },
  });
});
