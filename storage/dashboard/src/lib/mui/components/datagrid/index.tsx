"use client";

import { useToast } from "@lib/shared/components/toast/hooks";
import {
  GridColDef,
  GridDataSource,
  GridGetRowsError,
  GridValidRowModel,
  DataGrid as MuiDataGrid,
} from "@mui/x-data-grid";

interface DatagridProps<TData extends GridValidRowModel = GridValidRowModel> {
  columns: GridColDef<TData>[];
  dataSource: GridDataSource;
}

export default function DataGrid<TData extends GridValidRowModel = GridValidRowModel>(
  props: DatagridProps<TData>,
) {
  const toast = useToast();

  return (
    <MuiDataGrid
      columns={props.columns}
      showToolbar
      dataSource={props.dataSource}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
      }}
      pageSizeOptions={[10, 25, 50, 100]}
      filterDebounceMs={500}
      columnFilterDebounceMs={500}
      onDataSourceError={(error) => {
        if (error instanceof GridGetRowsError) {
          toast({
            variant: "error",
            title: "Fetching rows failed",
            description: error.message,
          });
        }
      }}
    />
  );
}
