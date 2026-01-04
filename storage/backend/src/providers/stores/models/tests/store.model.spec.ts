import { testModelCreate } from "@tusss/jest/examples";
import { Store } from "../store.model";

describe(Store.name, () => {
  testModelCreate({
    cls: Store,
    factories: {
      testBlankObject: (obj) => new Store(obj),
      testUndefined: (obj) => Store.create(obj),
    },
  });
});
