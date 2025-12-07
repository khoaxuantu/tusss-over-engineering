"use client";

import { GridGetRowAdapter } from "@lib/mui/adapters/get-row.adapter";
import DataGrid from "@lib/mui/components/datagrid";
import { ColumnDefHelper, FilterOperator } from "@lib/mui/helpers/data-grid.helper";
import { ButtonShow } from "@lib/resource/components/buttons/show";
import { ResourceId } from "@lib/resource/constants";
import Link from "@lib/shared/components/links";
import { GridColDef, GridDataSource } from "@mui/x-data-grid";
import { filterDistricts } from "../../actions/filter";
import { DistrictRowData } from "../../schemas";

const columns: GridColDef<DistrictRowData>[] = [
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
        <Link href={`/${ResourceId.district}/${id}`}>
          <ButtonShow>View</ButtonShow>
        </Link>
      );
    },
  }),
];

const dataSource: GridDataSource = {
  getRows: async (params) => {
    const payload = new GridGetRowAdapter(params).parse();
    const res = await filterDistricts(payload);

    if (res.error) throw res.error;

    return {
      rows: res.data.rows,
      rowCount: res.data.total,
    };
  },
};

export default function DistrictDatagridList() {
  return <DataGrid columns={columns} dataSource={dataSource} />;
}
