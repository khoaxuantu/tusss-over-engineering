import { BackendSchemas } from "@lib/apis/types";
import { CityRowData } from "@lib/resource/locations/cities/schemas";
import { DistrictRowData } from "@lib/resource/locations/districts/schemas";
import { ResourceListData } from "@lib/resource/types/data.type";
import z from "zod";

export type StoreType = BackendSchemas["StoreType"];

export type StoreRowData = {
  id: number;
  name: string;
  type: StoreType;
  href?: string;
  city: CityRowData;
  district: DistrictRowData;
};

export type StoreShowData = StoreRowData;

export type StoreListData = ResourceListData<StoreRowData>;

export type StoreNewFormData = z.infer<typeof StoreNewSchema>;

export const StoreNewSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum<StoreType[]>(["AUTH", "RETAIL"], { error: "Invalid type" }),
  href: z.url("Invalid URL").optional(),
  city_id: z.string().min(1, "City is required"),
  district_id: z.string().min(1, "District is required"),
});
