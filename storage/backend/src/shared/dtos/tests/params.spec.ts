import { testTransformValues } from "@/shared/tests/shared-examples/class-transformer";
import { ResourceParams } from "../params";

describe(ResourceParams.name, () => {
  testTransformValues({
    cls: ResourceParams,
    plainObj: { id: "1" },
    expectedObj: { id: 1 },
  });
});
