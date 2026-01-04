import { testModelCreate } from "@tusss/jest/examples";
import { SellerFilterResponse, SellerResponse } from "../response";

describe(SellerResponse.name, () => {
  testModelCreate({
    cls: SellerResponse,
    factories: {
      testBlankObject: () => new SellerResponse({}),
      testUndefined: () => new SellerResponse(),
    },
  });
});

describe(SellerFilterResponse.name, () => {
  testModelCreate({
    cls: SellerFilterResponse,
    factories: {
      testBlankObject: () => new SellerFilterResponse({}),
      testUndefined: () => new SellerFilterResponse(),
    },
  });
});
