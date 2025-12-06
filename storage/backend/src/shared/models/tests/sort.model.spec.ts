import { testModelCreate } from "@/shared/tests/shared-examples/model";
import { Sort } from "../sort.model";

describe(Sort.name, () => {
  testModelCreate({
    cls: Sort,
    factories: {
      testBlankObject: () => new Sort(),
      testUndefined: () => new Sort(undefined),
    },
  });
});
