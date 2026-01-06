import { applyDecorators, HttpStatus } from "@nestjs/common";
import {
  ApiResponseNoStatusOptions,
  ApiInternalServerErrorResponse as OpenApiError,
} from "@nestjs/swagger";
import { ApiResponseCustomOpts } from "./types";

interface CustomProps extends ApiResponseCustomOpts {}

export function ApiInternalServerErrorResponse(
  props?: ApiResponseNoStatusOptions,
  custom?: CustomProps
) {
  return applyDecorators(
    OpenApiError({
      description: "Internal Server Error",
      schema: {
        properties: {
          message: {
            type: "string",
            example: custom?.messages?.at(0) || "Internal Server Error",
            enum: custom?.messages,
          },
          statusCode: { type: "integer", default: HttpStatus.INTERNAL_SERVER_ERROR },
        },
        required: ["message", "statusCode"],
      },
      ...props,
    })
  );
}
