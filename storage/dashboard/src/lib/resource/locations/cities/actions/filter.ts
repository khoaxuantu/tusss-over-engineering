"use server";

import { BackendClient } from "@lib/apis/client";
import { ServerActionResponse } from "@lib/apis/response";
import { ResourceListParams } from "@lib/resource/types/params.type";
import { CityFilterSchema, CityListData, CityRowData, CitySortSchema } from "../schemas";

export async function filterCities(params: ResourceListParams<CityRowData>) {
  const page = params.paginate?.page || 1;
  const pageSize = params.paginate?.pageSize || 10;
  const filter = CityFilterSchema.fromGridFilter(params.filter);
  const sorts = CitySortSchema.fromParams(params.sort);

  const res = await BackendClient.GET("/cities", {
    params: {
      query: {
        page,
        perPage: pageSize,
        and: filter,
        sorts: sorts,
      },
    },
  });

  const data: CityListData = { rows: [], total: 0 };

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
