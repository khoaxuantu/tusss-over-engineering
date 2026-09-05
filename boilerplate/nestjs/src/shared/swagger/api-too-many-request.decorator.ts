import { applyDecorators, HttpStatus } from "@nestjs/common";
import {
  ApiResponseNoStatusOptions,
  ApiTooManyRequestsResponse as SwaggerResponse,
} from "@nestjs/swagger";
import { ApiResponseCustomOpts } from "./types";

interface CustomProps extends ApiResponseCustomOpts {}

export function ApiTooManyRequestsResponse(
  opts?: ApiResponseNoStatusOptions,
  custom?: CustomProps,
) {
  return applyDecorators(
    SwaggerResponse({
      schema: {
        properties: {
          message: {
            type: "string",
            example: custom?.messages?.at(0) || "Too Many Requests",
            enum: custom?.messages,
          },
          statusCode: { type: "integer", example: HttpStatus.TOO_MANY_REQUESTS },
        },
      },
      ...opts,
    }),
  );
}
