import { applyDecorators, HttpStatus } from "@nestjs/common";
import {
  ApiResponseNoStatusOptions,
  ApiConflictResponse as OpenApiConflictResponse,
} from "@nestjs/swagger";
import { CommonMessage } from "@tusss/core";
import { ApiResponseCustomOpts } from "./types";

interface CustomProps extends ApiResponseCustomOpts {}

export function ApiConflictResponse(opts?: ApiResponseNoStatusOptions, custom?: CustomProps) {
  return applyDecorators(
    OpenApiConflictResponse({
      description:
        "If the input payload contains a duplicate id, then this error should be returned",
      schema: {
        properties: {
          message: {
            type: "string",
            example: CommonMessage.error.duplicated,
            enum: custom?.messages,
          },
          error: { type: "string", default: "Conflict" },
          statusCode: { type: "integer", default: HttpStatus.CONFLICT },
        },
        required: ["message", "error", "statusCode"],
      },
      ...opts,
    })
  );
}
