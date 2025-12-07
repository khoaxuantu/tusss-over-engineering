import { BackendOperations, BackendSchemas } from "@lib/apis/types";
import { FilterStringOperatorMap } from "@lib/mui/helpers/data-grid.helper";
import { ResourceListData } from "@lib/resource/types/data.type";
import { ResourceFilterString, ResourceListParams } from "@lib/resource/types/params.type";
import { ElementOf } from "@lib/shared/types";

type DistrictBackendSorts =
  BackendOperations["DistrictController_filter"]["parameters"]["query"]["sorts"];

export type DistrictSort = ElementOf<DistrictBackendSorts>;

export type DistrictFilterField = BackendSchemas["DistrictFilterField"];

export type DistrictRowData = {
  id: string;
  name: string;
};

export type DistrictShowData = DistrictRowData;

export type DistrictListData = ResourceListData<DistrictRowData>;

export type DistrictListParams = ResourceListParams<DistrictRowData>;

export class DistrictFilterModel implements DistrictFilterField {
  id?: ResourceFilterString | undefined;
  name?: ResourceFilterString | undefined;

  static fromFilterParams(filters: DistrictListParams["filter"]) {
    const filter: DistrictFilterModel = {};

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

export class DistrictSortModel implements DistrictSort {
  direction: "asc" | "desc";
  field: "name" = "name" as const;

  constructor(direction: "asc" | "desc") {
    this.direction = direction;
  }

  static fromSortParams(sorts: DistrictListParams["sort"]) {
    const arr: DistrictSort[] = [];

    sorts?.forEach((item) => {
      if (item.direction) arr.push(new DistrictSortModel(item.direction));
    });

    return arr;
  }
}
