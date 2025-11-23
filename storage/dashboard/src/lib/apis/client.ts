import { BackendUrl } from "@lib/shared/configs/client";
import createClient from "openapi-fetch";
import QueryString from "qs";
import type { paths } from "./gen/schemas";

export const BackendClient = createClient<paths>({
  baseUrl: BackendUrl,
  querySerializer: (data) => QueryString.stringify(data),
});
