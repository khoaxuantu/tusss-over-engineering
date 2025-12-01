"use server";

import { BackendClient } from "@lib/apis/client";
import { ServerActionResponse } from "@lib/apis/response";
import { CityNewFormData } from "../schemas";

export async function postCity(data: CityNewFormData) {
  try {
    const res = await BackendClient.POST("/cities", {
      body: {
        id: data.id,
        name: data.name,
      },
    });

    if (res.error) {
      return new ServerActionResponse({
        error: {
          code: "400",
          message: "Create new city failed. " + res.error.message,
        },
        data: null,
      }).toPlain();
    }

    return new ServerActionResponse({
      data: res.data,
    }).toPlain();
  } catch {
    return new ServerActionResponse({
      error: {
        code: "500",
        message: "Create new city failed. Something went wrong with the server",
      },
      data: null,
    }).toPlain();
  }
}
