import { testModelCreate } from "@tusss/jest/examples";
import { StoreLocation, StoreLocationInsert } from "../store-location.model";
import { stubStoreLocationRecordFlat } from "./stubs/store-location.stub";

describe(StoreLocationInsert.name, () => {
  testModelCreate({
    cls: StoreLocationInsert,
    factories: {
      testBlankObject: () => new StoreLocationInsert({}),
      testUndefined: () => StoreLocationInsert.create(),
    },
  });
});

describe(StoreLocation.name, () => {
  testModelCreate({
    cls: StoreLocation,
    factories: {
      testBlankObject: () => new StoreLocation({}),
      testUndefined: () => StoreLocation.create(),
    },
  });

  describe("fromFlat", () => {
    it("should map city when city.id is not null", () => {
      const data = stubStoreLocationRecordFlat({ "city.id": "abc", "city.name": "ABC" });
      const obj = StoreLocation.fromFlat(data);
      expect(obj.city).toBeDefined();
    });

    it("should not map city when city.id is blank", () => {
      const data = stubStoreLocationRecordFlat({ "city.id": "" });
      const obj = StoreLocation.fromFlat(data);
      expect(obj.city).toBeUndefined();
    });

    it("should map district when district.id is not null", () => {
      const data = stubStoreLocationRecordFlat({ "district.id": "abc", "district.name": "ABC" });
      const obj = StoreLocation.fromFlat(data);
      expect(obj.district).toBeDefined();
    });

    it("should not map district when district.id is blank", () => {
      const data = stubStoreLocationRecordFlat({ "district.id": "" });
      const obj = StoreLocation.fromFlat(data);
      expect(obj.district).toBeUndefined();
    });
  });
});
