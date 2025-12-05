import { testTransformValues } from "@/shared/tests/shared-examples/class-transformer";
import { FilterDate } from "../filter.model";

describe(FilterDate.name, () => {
  const dateStr = new Date().toISOString();
  const dateExpect = expect.any(Date);

  describe("singular values", () => {
    testTransformValues({
      cls: FilterDate,
      plainObj: {
        eq: dateStr,
        ne: dateStr,
        gt: dateStr,
        gte: dateStr,
        lt: dateStr,
        lte: dateStr,
        in: dateStr,
        nin: dateStr,
      },
      expectedObj: {
        eq: dateExpect,
        ne: dateExpect,
        gt: dateExpect,
        gte: dateExpect,
        lt: dateExpect,
        lte: dateExpect,
        in: [dateExpect],
        nin: [dateExpect],
      },
    });
  });

  describe("array values", () => {
    testTransformValues({
      cls: FilterDate,
      plainObj: {
        in: [dateStr],
        nin: [dateStr],
      },
      expectedObj: {
        in: [dateExpect],
        nin: [dateExpect],
      },
    });
  });
});
