import { testModelCreate } from "@tusss/jest/examples";
import { District, DistrictInsert } from "../district.model";

describe(District.name, () => {
  testModelCreate({
    cls: District,
    factories: {
      testBlankObject: (obj) => new District(obj),
      testUndefined: (obj) => District.create(obj),
    },
  });
});

describe(DistrictInsert.name, () => {
  testModelCreate({
    cls: DistrictInsert,
    factories: {
      testBlankObject: (obj) => new DistrictInsert(obj),
      testUndefined: () => DistrictInsert.create(),
    },
  });
});
