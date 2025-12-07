import { BackendSchemas } from "@lib/apis/types";
import { GridFilterOperatorKey } from "@lib/mui/types";
import { KeyOrString } from "@lib/shared/interfaces/types";
import { GridPaginationModel, GridSortDirection, GridValidRowModel } from "@mui/x-data-grid";

export interface ResourceParams {
  params: Promise<{ id: string }>;
}

interface SortParams<TData extends GridValidRowModel = GridValidRowModel> {
  field: KeyOrString<keyof TData>;
  direction: GridSortDirection;
}

export interface ResourceListParams<TData extends GridValidRowModel = GridValidRowModel> {
  sort?: SortParams<TData>[];
  filter?: {
    field: KeyOrString<keyof TData>;
    operator: GridFilterOperatorKey;
    value: any;
  }[];
  paginate?: GridPaginationModel;
}

export type ResourceFilterString = BackendSchemas["FilterString"];
