import {
  getGridDateOperators,
  getGridNumericOperators,
  getGridStringOperators,
  GridColDef,
  GridValidRowModel,
} from "@mui/x-data-grid";

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
}

export class FilterOperator {
  private static _string: Record<string, string> = {
    contains: "contains",
    equals: "eq",
    isAnyOf: "in",
  };

  private static _numeric: Record<string, string> = {
    "=": "eq",
    "!=": "ne",
    ">": "gt",
    ">=": "gte",
    "<": "lt",
    "<=": "lte",
    isAnyOf: "in",
  };

  private static _date: Record<string, string> = {
    is: "eq",
    not: "ne",
    after: "gt",
    onOrAfter: "gte",
    before: "lt",
    onOrBefore: "lte",
    isAnyOf: "in",
  };

  static stringFull = getGridStringOperators();
  static numericFull = getGridNumericOperators();
  static dateFull = getGridDateOperators();

  static string = FilterOperator.stringFull.filter((operator) => {
    return !!FilterOperator._string[operator.value];
  });

  static numeric = FilterOperator.numericFull.filter((operator) => {
    return !!FilterOperator._numeric[operator.value];
  });

  static date = FilterOperator.dateFull.filter((operator) => {
    return !!FilterOperator._date[operator.value];
  });
}
