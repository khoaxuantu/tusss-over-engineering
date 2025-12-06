import { testTransformValues } from "@/shared/tests/shared-examples/class-transformer";
import { FilterDate, FilterNumber } from "../filter.model";

describe(FilterNumber.name, () => {
  const numberStr = "123";
  const numberExpect = 123;

  describe("singular values", () => {
    testTransformValues({
      cls: FilterNumber,
      plainObj: {
        eq: numberStr,
        ne: numberStr,
        gt: numberStr,
        gte: numberStr,
        lt: numberStr,
        lte: numberStr,
        in: numberStr,
        nin: numberStr,
      },
      expectedObj: {
        eq: numberExpect,
        ne: numberExpect,
        gt: numberExpect,
        gte: numberExpect,
        lt: numberExpect,
        lte: numberExpect,
        in: [numberExpect],
        nin: [numberExpect],
      },
    });
  });
});

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
