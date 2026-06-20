import { applyDecorators, HttpStatus } from "@nestjs/common";
import {
  ApiResponseOptions,
  ApiResponseSchemaHost,
  ApiNotFoundResponse as SwaggerApiNotFoundResponse,
} from "@nestjs/swagger";
import { CommonMessage } from "@tusss/core";
import { ApiResponseCustomOpts } from "./types";

interface CustomOpts extends ApiResponseCustomOpts {}

export function ApiNotFoundResponse(opts?: ApiResponseOptions, custom?: CustomOpts) {
  const defaultSchema: ApiResponseSchemaHost["schema"] = {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Not found",
        enum: custom?.messages ?? [CommonMessage.error.notFound],
      },
      error: { type: "string", example: "Not Found" },
      statusCode: { type: "integer", example: HttpStatus.NOT_FOUND },
    },
    required: ["message", "error", "statusCode"],
  };

  return applyDecorators(
    SwaggerApiNotFoundResponse({
      schema: defaultSchema,
      description: "Not Found",
      ...opts,
    }),
  );
}
