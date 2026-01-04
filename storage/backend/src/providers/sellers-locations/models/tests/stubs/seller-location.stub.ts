import { SellerLocationRecordFlat } from "../../seller-location.model";

export function stubSellerLocationRecordFlat(override?: Partial<SellerLocationRecordFlat>) {
  return {
    sellerId: 1,
    cityId: "1",
    districtId: "1",
    "city.id": null,
    "city.name": null,
    "district.id": null,
    "district.name": null,
    ...override,
  } satisfies SellerLocationRecordFlat;
}
