import { BackendOperations, BackendSchemas } from "@lib/apis/types";
import { FilterStringOperatorMap } from "@lib/mui/helpers/data-grid.helper";
import { ResourceListData } from "@lib/resource/types/data.type";
import { ResourceFilterString, ResourceListParams } from "@lib/resource/types/params.type";
import { ElementOf } from "@lib/shared/types";
import z from "zod";

export type CityRowData = {
  id: string;
  name: string;
};

export type CityShowData = CityRowData;

export type CityFilterField = BackendSchemas["CityFilterField"];

type CityBackendSorts = BackendOperations["CityController_filter"]["parameters"]["query"]["sorts"];
export type CitySort = ElementOf<CityBackendSorts>;

export type CityListData = ResourceListData<CityRowData>;

export type CityNewFormData = z.infer<typeof CityNewSchema>;

export const CityNewSchema = z.object({
  id: z.string().min(1, "ID is required"),
  name: z.string().min(1, "Name is required"),
});

export class CityFilterModel implements CityFilterField {
  id?: ResourceFilterString;
  name?: ResourceFilterString;

  static fromGridFilter(filters: ResourceListParams<CityRowData>["filter"]) {
    const filter: CityFilterModel = {};

    filters?.forEach((item) => {
      const oper = FilterStringOperatorMap.get(item.operator);
      if (!oper) return;

      if (item.field == "id") {
        filter.id ??= {};
        filter.id[oper] = item.value;
      }

      if (item.field == "name") {
        filter.name ??= {};
        filter.name[oper] = item.value;
      }
    });

    return filter;
  }
}

export class CitySortModel implements CitySort {
  readonly field: "name" = "name" as const;
  direction: "asc" | "desc";

  constructor(direction: "asc" | "desc") {
    this.direction = direction;
  }

  static fromParams(sorts: ResourceListParams<CityRowData>["sort"]) {
    const arr: CitySort[] = [];

    sorts?.forEach((item) => {
      if (item.direction) arr.push(new CitySortModel(item.direction));
    });

    return arr;
  }
}
