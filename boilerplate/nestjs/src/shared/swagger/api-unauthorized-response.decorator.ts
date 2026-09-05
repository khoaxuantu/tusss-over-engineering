import { applyDecorators, HttpStatus } from "@nestjs/common";
import {
  ApiResponseNoStatusOptions,
  ApiUnauthorizedResponse as SwaggerResponse,
} from "@nestjs/swagger";
import { ApiResponseCustomOpts } from "./types";

interface CustomProps extends ApiResponseCustomOpts {}

export function ApiUnauthorizedResponse(opts?: ApiResponseNoStatusOptions, custom?: CustomProps) {
  return applyDecorators(
    SwaggerResponse({
      description: "Unauthorized",
      schema: {
        properties: {
          message: {
            type: "string",
            example: custom?.messages?.at(0) || "Unauthorized",
            enum: custom?.messages,
          },
          statusCode: { type: "integer", example: HttpStatus.UNAUTHORIZED },
        },
        required: ["message", "statusCode"],
      },
      ...opts,
    }),
  );
}
