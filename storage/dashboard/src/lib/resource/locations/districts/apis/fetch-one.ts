import { BackendClient } from "@lib/apis/client";
import { ServerActionResponse } from "@lib/apis/response";
import "server-only";
import { DistrictShowData } from "../schemas";

export async function fetchOneDistrict(id: string) {
  const res = await BackendClient.GET("/districts/{id}", { params: { path: { id } } });

  const data: DistrictShowData = { id: "", name: "" };

  if (res.error) {
    return new ServerActionResponse({
      error: {
        code: String(res.error.statusCode),
        message: res.error.message,
      },
      data,
    });
  }

  data.id = res.data.id;
  data.name = res.data.name;

  return new ServerActionResponse({ data });
}
