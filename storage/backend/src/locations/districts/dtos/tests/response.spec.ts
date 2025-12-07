import { testModelCreate } from "@/shared/tests/shared-examples/model";
import { DistrictFilterResponse, DistrictResponse } from "../response";

describe(DistrictResponse.name, () => {
  testModelCreate({
    cls: DistrictResponse,
    factories: {
      testBlankObject: () => new DistrictResponse({}),
      testUndefined: () => new DistrictResponse(undefined),
    },
  });
});

describe(DistrictFilterResponse.name, () => {
  testModelCreate({
    cls: DistrictFilterResponse,
    factories: {
      testBlankObject: () => new DistrictFilterResponse({}),
      testUndefined: () => new DistrictFilterResponse(undefined),
    },
  });
});
