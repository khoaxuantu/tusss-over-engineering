import { BackendClient } from "@lib/apis/client";
import { ServerActionResponse } from "@lib/apis/response";
import "server-only";
import { CityShowData } from "../schemas";

export async function fetchOneCity(id: string) {
  const res = await BackendClient.GET("/cities/{id}", {
    params: { path: { id } },
  });

  if (res.error || !res.data) {
    return new ServerActionResponse({
      data: { id: "", name: "" } as CityShowData,
      error: {
        code: String(res.error.statusCode),
        message: res.error.message,
      },
    }).toPlain();
  }

  return new ServerActionResponse<CityShowData>({
    data: res.data,
  }).toPlain();
}
