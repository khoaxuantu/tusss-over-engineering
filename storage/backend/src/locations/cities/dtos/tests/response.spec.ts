import { testModelCreate } from "@/shared/tests/shared-examples/model";
import { CityCreateResponse, CityFilterResponse, CityResponse } from "../response";

describe(CityCreateResponse.name, () => {
  testModelCreate({
    cls: CityCreateResponse,
    factories: {
      testBlankObject: () => new CityCreateResponse({}),
      testUndefined: () => new CityCreateResponse(undefined),
    },
  });
});

describe(CityResponse.name, () => {
  testModelCreate({
    cls: CityResponse,
    factories: {
      testBlankObject: () => new CityResponse({}),
      testUndefined: () => new CityResponse(undefined),
    },
  });
});

describe(CityFilterResponse.name, () => {
  testModelCreate({
    cls: CityFilterResponse,
    factories: {
      testBlankObject: () => new CityFilterResponse({}),
      testUndefined: () => new CityFilterResponse(undefined),
    },
  });
});
