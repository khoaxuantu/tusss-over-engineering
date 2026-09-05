import { applyDecorators, HttpStatus } from "@nestjs/common";
import {
  ApiResponseOptions,
  SchemaObject,
  ApiBadRequestResponse as SwaggerBadRequestResponse,
} from "@nestjs/swagger";
import { ApiResponseCustomOpts } from "./types";

interface CustomOpts extends ApiResponseCustomOpts {
  multipleSchemas?: {
    default?: boolean;
    schemas: SchemaObject[];
  };
}

export function ApiBadRequestResponse(opts?: ApiResponseOptions, custom?: CustomOpts) {
  const defaultSchema: SchemaObject = {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: custom?.messages?.at(0) || "Invalid param",
        enum: custom?.messages,
      },
      error: { type: "string", example: "Bad Request" },
      statusCode: { type: "integer", example: HttpStatus.BAD_REQUEST },
    },
    required: ["message", "statusCode"],
  };

  if (custom?.multipleSchemas) {
    const schemas = [...custom.multipleSchemas.schemas];
    if (custom.multipleSchemas.default) schemas.push(defaultSchema);

    return applyDecorators(
      SwaggerBadRequestResponse({
        schema: { oneOf: schemas },
        description: "Bad Request",
        ...opts,
      }),
    );
  }

  return applyDecorators(
    SwaggerBadRequestResponse({ schema: defaultSchema, description: "Bad Request", ...opts }),
  );
}
