import { testModelCreate } from "@tusss/jest/examples";
import { SellerLocation, SellerLocationInsert } from "../seller-location.model";
import { stubSellerLocationRecordFlat } from "./stubs/seller-location.stub";

describe(SellerLocationInsert.name, () => {
  testModelCreate({
    cls: SellerLocationInsert,
    factories: {
      testBlankObject: () => new SellerLocationInsert({}),
      testUndefined: () => SellerLocationInsert.create(),
    },
  });
});

describe(SellerLocation.name, () => {
  testModelCreate({
    cls: SellerLocation,
    factories: {
      testBlankObject: () => new SellerLocation({}),
      testUndefined: () => SellerLocation.create(),
    },
  });

  describe("fromFlat", () => {
    it("should map city when city.id is not null", () => {
      const data = stubSellerLocationRecordFlat({ "city.id": "abc", "city.name": "ABC" });
      const obj = SellerLocation.fromFlat(data);
      expect(obj.city).toBeDefined();
    });

    it("should not map city when city.id is blank", () => {
      const data = stubSellerLocationRecordFlat({ "city.id": "" });
      const obj = SellerLocation.fromFlat(data);
      expect(obj.city).toBeUndefined();
    });

    it("should map district when district.id is not null", () => {
      const data = stubSellerLocationRecordFlat({ "district.id": "abc", "district.name": "ABC" });
      const obj = SellerLocation.fromFlat(data);
      expect(obj.district).toBeDefined();
    });

    it("should not map district when district.id is blank", () => {
      const data = stubSellerLocationRecordFlat({ "district.id": "" });
      const obj = SellerLocation.fromFlat(data);
      expect(obj.district).toBeUndefined();
    });
  });
});
