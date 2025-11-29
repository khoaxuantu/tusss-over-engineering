import { KeyOrString } from "@lib/shared/interfaces/types";
import {
  GridFilterItem,
  GridPaginationModel,
  GridSortDirection,
  GridValidRowModel,
} from "@mui/x-data-grid";

export interface ResourceParams {
  params: Promise<{ id: string }>;
}

interface SortParams<TData extends GridValidRowModel = GridValidRowModel> {
  field: KeyOrString<keyof TData>;
  sort: GridSortDirection;
}

export interface ResourceListParams<TData extends GridValidRowModel = GridValidRowModel> {
  sort?: SortParams<TData>[];
  filter?: {
    field: KeyOrString<keyof TData>;
    operator: GridFilterItem["operator"];
    value: any;
  }[];
  paginate?: GridPaginationModel;
}
