import { ResourceFilterString } from "@lib/resource/types/params.type";
import {
  getGridDateOperators,
  getGridNumericOperators,
  getGridStringOperators,
  GridColDef,
  GridValidRowModel,
} from "@mui/x-data-grid";
import { GridFilterOperatorKey } from "../types";

type ColProps<TData extends GridValidRowModel> = GridColDef<TData> & {
  field: keyof TData | "actions";
};

/**
 * I would not recommend create methods based on type properties, i.e date(), number().
 * Because it may cause too many spread operations.
 */
export class ColumnDefHelper {
  static common<TData extends GridValidRowModel>(props: ColProps<TData>): GridColDef<TData> {
    return {
      minWidth: 250,
      ...props,
    };
  }

  static id<TData extends GridValidRowModel>(props?: Partial<ColProps<TData>>): GridColDef<TData> {
    return ColumnDefHelper.common({
      field: "id",
      headerName: "Id",
      ...props,
    });
  }

  static createdAt<TData extends GridValidRowModel>(
    props?: Partial<ColProps<TData>>,
  ): GridColDef<TData> {
    return ColumnDefHelper.common({
      filterOperators: FilterOperator.date,
      ...props,
      field: "createdAt",
      headerName: "Created At",
      type: "dateTime",
      valueGetter: (value: any) => value && new Date(value),
    });
  }

  static actions<TData extends GridValidRowModel>(props: Partial<ColProps<TData>>) {
    return ColumnDefHelper.common<TData>({
      field: "actions",
      headerName: "Actions",
      type: "actions",
      ...props,
    });
  }
}

export const FilterStringOperatorMap = new Map<GridFilterOperatorKey, keyof ResourceFilterString>([
  ["contains", "contain"],
  ["equals", "eq"],
  ["isAnyOf", "in"],
]);

export const FilterNumericOperatorMap = new Map<GridFilterOperatorKey, string>([
  ["=", "eq"],
  ["!=", "ne"],
  [">", "gt"],
  [">=", "gte"],
  ["<", "lt"],
  ["<=", "lte"],
  ["isAnyOf", "in"],
]);

export const FilterDateOperatorMap = new Map<GridFilterOperatorKey, string>([
  ["is", "eq"],
  ["not", "ne"],
  ["after", "gt"],
  ["onOrAfter", "gte"],
  ["before", "lt"],
  ["onOrBefore", "lte"],
  ["isAnyOf", "in"],
]);

export class FilterOperator {
  static stringFull = getGridStringOperators();
  static numericFull = getGridNumericOperators();
  static dateFull = getGridDateOperators();

  static string = FilterOperator.stringFull.filter((operator) => {
    return !!FilterStringOperatorMap.has(operator.value);
  });

  static numeric = FilterOperator.numericFull.filter((operator) => {
    return !!FilterNumericOperatorMap.has(operator.value);
  });

  static date = FilterOperator.dateFull.filter((operator) => {
    return !!FilterDateOperatorMap.has(operator.value);
  });
}
