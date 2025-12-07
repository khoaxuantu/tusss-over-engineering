"use server";

import { BackendClient } from "@lib/apis/client";
import { ServerActionResponse } from "@lib/apis/response";
import { PaginationModel } from "@lib/shared/models/pagination.model";
import {
  DistrictFilterModel,
  DistrictListData,
  DistrictListParams,
  DistrictSortModel,
} from "../schemas";

export async function filterDistricts(params: DistrictListParams) {
  const pagination = new PaginationModel({
    page: params.paginate?.page,
    pageSize: params.paginate?.pageSize,
  });
  const filter = DistrictFilterModel.fromFilterParams(params.filter);
  const sorts = DistrictSortModel.fromSortParams(params.sort);

  const res = await BackendClient.GET("/districts", {
    params: {
      query: {
        and: filter,
        sorts: sorts,
        page: pagination.page,
        perPage: pagination.perPage,
      },
    },
  });

  const data: DistrictListData = { rows: [], total: 0 };

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
