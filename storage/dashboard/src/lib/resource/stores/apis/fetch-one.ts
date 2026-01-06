import { BackendClient } from "@lib/apis/client";
import { ServerActionResponse } from "@lib/apis/response";
import "server-only";
import { StoreShowData } from "../schemas";

export async function fetchOneStore(id: number) {
  const res = await BackendClient.GET("/stores/{id}", {
    params: { path: { id } },
  });

  const data: StoreShowData = {
    id,
    city: { id: "", name: "" },
    district: { id: "", name: "" },
    name: "",
    type: "AUTH",
  };

  if (res.error) {
    return new ServerActionResponse({
      error: {
        code: String(res.error.statusCode),
        message: res.error.message,
      },
      data,
    });
  }

  data.city = res.data.city;
  data.district = res.data.district;
  data.name = res.data.name;
  data.type = res.data.type;
  data.href = res.data.href;

  return new ServerActionResponse({ data });
}
