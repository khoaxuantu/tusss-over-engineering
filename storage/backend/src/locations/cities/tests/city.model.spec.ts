import { testModelCreate } from "@/shared/tests/shared-examples/model";
import { City } from "../../cities/city.model";

describe(City.name, () => {
  testModelCreate({
    cls: City,
    factories: {
      testBlankObject: (obj) => new City(obj),
      testUndefined: (obj) => City.create(obj),
    },
  });
});
