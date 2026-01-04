import { StoreLocationRecordFlat } from "../../store-location.model";

export function stubStoreLocationRecordFlat(override?: Partial<StoreLocationRecordFlat>) {
  return {
    storeId: 1,
    cityId: "1",
    districtId: "1",
    "city.id": null,
    "city.name": null,
    "district.id": null,
    "district.name": null,
    ...override,
  } satisfies StoreLocationRecordFlat;
}
