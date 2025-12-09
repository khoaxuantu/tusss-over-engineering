import { applyDecorators, HttpStatus } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";

interface ApiCommonResponseOpts {
  messages?: string[];
  status?: HttpStatus;
}

export function ApiCommonResponse(opts: ApiCommonResponseOpts) {
  return applyDecorators(
    ApiResponse({
      status: opts.status || HttpStatus.OK,
      schema: {
        properties: {
          message: { type: "string", enum: opts.messages },
        },
        required: ["message"],
      },
    }),
  );
}
