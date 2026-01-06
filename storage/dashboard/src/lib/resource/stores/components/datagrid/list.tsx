"use client";

import { GridGetRowAdapter } from "@lib/mui/adapters/get-row.adapter";
import DataGrid from "@lib/mui/components/datagrid";
import { ColumnDefHelper } from "@lib/mui/helpers/data-grid.helper";
import { ButtonShow } from "@lib/resource/components/buttons/show";
import { ResourceId } from "@lib/resource/constants";
import Link from "@lib/shared/components/links";
import { Chip } from "@mui/material";
import { GridColDef, GridDataSource } from "@mui/x-data-grid";
import { filterStores } from "../../actions/filter";
import { StoreRowData } from "../../schemas";

const columns: GridColDef<StoreRowData>[] = [
  ColumnDefHelper.id({ filterable: false, sortable: false }),
  ColumnDefHelper.common({
    field: "name",
    headerName: "Name",
    filterable: false,
    sortable: false,
  }),
  ColumnDefHelper.common({
    field: "type",
    headerName: "Type",
    filterable: false,
    sortable: false,
    renderCell: (params) => {
      const type = params.row.type;
      return <Chip label={type} />;
    },
  }),
  ColumnDefHelper.common({
    field: "city",
    headerName: "City",
    filterable: false,
    sortable: false,
    type: "string",
    renderCell: (params) => {
      const city = params.row.city;

      return <Link href={`/${ResourceId.city}/${city.id}`}>{city.name}</Link>;
    },
  }),
  ColumnDefHelper.common({
    field: "district",
    headerName: "District",
    filterable: false,
    sortable: false,
    type: "string",
    renderCell: (params) => {
      const district = params.row.district;

      return <Link href={`/${ResourceId.district}/${district.id}`}>{district.name}</Link>;
    },
  }),
  ColumnDefHelper.actions({
    renderCell: (params) => {
      const id = params.row.id;
      return (
        <Link href={`/${ResourceId.store}/${id}`}>
          <ButtonShow />
        </Link>
      );
    },
  }),
];

export default function StoreDatagrid() {
  const dataSource: GridDataSource = {
    getRows: async (params) => {
      const payload = new GridGetRowAdapter(params).parse();
      const res = await filterStores(payload);

      if (res.error) throw res.error;

      return {
        rows: res.data.rows,
        rowCount: res.data.total,
      };
    },
  };

  return <DataGrid columns={columns} dataSource={dataSource} />;
}
