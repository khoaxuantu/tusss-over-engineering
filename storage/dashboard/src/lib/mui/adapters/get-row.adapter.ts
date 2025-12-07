import { ResourceListParams } from "@lib/resource/types/params.type";
import { GridGetRowsParams, GridValidRowModel } from "@mui/x-data-grid";

export class GridGetRowAdapter<TRow extends GridValidRowModel> {
  constructor(private readonly params: GridGetRowsParams) {}

  parse(): ResourceListParams<TRow> {
    return {
      filter: this.params.filterModel.items.map((item) => ({
        field: item.field,
        operator: item.operator,
        value: item.value,
      })),
      sort: this.params.sortModel.map((item) => ({
        field: item.field,
        direction: item.sort,
      })),
      paginate: this.params.paginationModel
        ? {
            page: this.params.paginationModel.page + 1,
            pageSize: this.params.paginationModel.pageSize,
          }
        : undefined,
    };
  }
}
