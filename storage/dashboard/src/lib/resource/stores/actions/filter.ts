"use server";

import { BackendClient } from "@lib/apis/client";
import { ServerActionResponse } from "@lib/apis/response";
import { ResourceListParams } from "@lib/resource/types/params.type";
import { PaginationModel } from "@lib/shared/models/pagination.model";
import { StoreListData, StoreRowData } from "../schemas";

export async function filterStores(params: ResourceListParams<StoreRowData>) {
  const pagination = new PaginationModel(params.paginate);

  const res = await BackendClient.GET("/stores", {
    params: {
      query: { page: pagination.page, perPage: pagination.perPage },
    },
  });

  const data: StoreListData = { rows: [], total: 0 };

  if (res.error || !res.data) {
    return new ServerActionResponse({
      error: {
        code: String(res.error.statusCode),
        message: res.error.message,
      },
      data,
    }).toPlain();
  }

  data.rows = res.data.data;
  data.total = res.data.pagination.total;

  return new ServerActionResponse({ data }).toPlain();
}
