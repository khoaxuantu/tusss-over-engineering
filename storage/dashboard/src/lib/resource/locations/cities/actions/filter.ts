"use server";

import { BackendClient } from "@lib/apis/client";
import { ServerActionResponse } from "@lib/apis/response";
import { ResourceListParams } from "@lib/resource/types/params.type";
import { PaginationModel } from "@lib/shared/models/pagination.model";
import { CityFilterModel, CityListData, CityRowData, CitySortModel } from "../schemas";

export async function filterCities(params: ResourceListParams<CityRowData>) {
  const pagination = new PaginationModel({
    page: params.paginate?.page,
    pageSize: params.paginate?.pageSize,
  });
  const filter = CityFilterModel.fromGridFilter(params.filter);
  const sorts = CitySortModel.fromParams(params.sort);

  const res = await BackendClient.GET("/cities", {
    params: {
      query: {
        page: pagination.page,
        perPage: pagination.perPage,
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
