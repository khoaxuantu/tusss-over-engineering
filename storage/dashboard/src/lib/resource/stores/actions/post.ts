"use server";

import { BackendClient } from "@lib/apis/client";
import { ServerActionResponse } from "@lib/apis/response";
import { StoreNewFormData } from "../schemas";

export async function postStore(data: StoreNewFormData) {
  const res = await BackendClient.POST("/stores", {
    body: {
      city_id: data.city_id,
      district_id: data.district_id,
      href: data.href,
      name: data.name,
      type: data.type,
    },
  });

  if (res.error) {
    return new ServerActionResponse({
      error: {
        code: String(res.error.statusCode),
        message: res.error.message,
      },
      data: null,
    }).toPlain();
  }

  return new ServerActionResponse({ data: res.data }).toPlain();
}
