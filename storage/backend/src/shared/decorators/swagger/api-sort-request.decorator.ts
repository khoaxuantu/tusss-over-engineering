import { ApiQuery } from "@nestjs/swagger";

interface ApiSortsRequestOpts {
  fields: string[];
  examples?: Record<string, { value: Record<string, any> }>;
}

export function ApiSortsRequest(opts: ApiSortsRequestOpts) {
  return ApiQuery({
    name: "sorts",
    description: "Sorts",
    style: "deepObject",
    explode: true,
    schema: {
      type: "object",
      properties: {
        field: { type: "string", enum: opts.fields },
        direction: { type: "string", enum: ["asc", "desc"] },
      },
      required: ["field", "direction"],
    },
    examples: opts.examples,
  });
}
