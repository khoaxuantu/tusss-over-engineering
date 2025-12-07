"use client";

import { GridGetRowAdapter } from "@lib/mui/adapters/get-row.adapter";
import DataGrid from "@lib/mui/components/datagrid";
import { ColumnDefHelper, FilterOperator } from "@lib/mui/helpers/data-grid.helper";
import { ResourceId } from "@lib/resource/constants";
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
        <Link href={`/${ResourceId.city}/${id}`}>
          <Button startIcon={<VisibilityOutlined />}>View</Button>
        </Link>
      );
    },
  }),
];

export default function CityDatagrid() {
  const dataSource: GridDataSource = {
    getRows: async (params) => {
      const payload = new GridGetRowAdapter(params).parse();
      const res = await filterCities(payload);

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
