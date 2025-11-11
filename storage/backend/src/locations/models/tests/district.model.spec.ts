import { testModelCreate } from "@/shared/tests/shared-examples/model";
import { District } from "../district.model";

describe(District.name, () => {
  testModelCreate({
    cls: District,
    factories: {
      testBlankObject: (obj) => new District(obj),
      testUndefined: (obj) => District.create(obj),
    },
  });
});
