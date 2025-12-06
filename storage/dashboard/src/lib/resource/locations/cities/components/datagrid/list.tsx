"use client";

import DataGrid from "@lib/mui/components/datagrid";
import { ColumnDefHelper, FilterOperator } from "@lib/mui/helpers/data-grid.helper";
import Link from "@lib/shared/components/links";
import { VisibilityOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { GridColDef, GridDataSource } from "@mui/x-data-grid";
import { filterCities } from "../../actions/filter";
import { CityRowData } from "../../schemas";

const columns: GridColDef<CityRowData>[] = [
  ColumnDefHelper.id({ filterOperators: FilterOperator.string, sortable: false }),
  ColumnDefHelper.common({
    field: "name",
    headerName: "Name",
    filterOperators: FilterOperator.string,
  }),
  ColumnDefHelper.actions({
    renderCell: (params) => {
      const id = params.row.id;
      return (
        <Link href={`/cities/${id}`}>
          <Button startIcon={<VisibilityOutlined />}>View</Button>
        </Link>
      );
    },
  }),
];

export default function CityDatagrid() {
  const dataSource: GridDataSource = {
    getRows: async (params) => {
      const res = await filterCities({
        paginate: params.paginationModel,
        filter: params.filterModel.items.map((item) => ({
          field: item.field,
          operator: item.operator,
          value: item.value,
        })),
        sort: params.sortModel.map((item) => ({
          field: item.field,
          direction: item.sort,
        })),
      });

      if (res.error) throw res.error;

      return {
        rows: res.data.rows,
        rowCount: res.data.total,
      };
    },
  };

  return (
    <DataGrid
      columns={columns}
      dataSource={dataSource}
      initialSort={{
        sortModel: [{ field: "name", sort: "asc" }],
      }}
    />
  );
}
