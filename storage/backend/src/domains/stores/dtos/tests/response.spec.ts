import { testModelCreate } from "@tusss/jest/examples";
import { StoreFilterResponse, StoreResponse } from "../response";

describe(StoreResponse.name, () => {
  testModelCreate({
    cls: StoreResponse,
    factories: {
      testBlankObject: () => new StoreResponse({}),
      testUndefined: () => new StoreResponse(),
    },
  });
});

describe(StoreFilterResponse.name, () => {
  testModelCreate({
    cls: StoreFilterResponse,
    factories: {
      testBlankObject: () => new StoreFilterResponse({}),
      testUndefined: () => new StoreFilterResponse(),
    },
  });
});
