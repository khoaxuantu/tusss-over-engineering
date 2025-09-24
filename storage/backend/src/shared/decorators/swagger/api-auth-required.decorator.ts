import { applyDecorators, HttpStatus } from "@nestjs/common";
import { ApiBearerAuth, ApiUnauthorizedResponse } from "@nestjs/swagger";

export function ApiAuthRequired() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiUnauthorizedResponse({
      description: "When user is not logged in",
      schema: {
        properties: {
          message: { type: "string", example: "Unauthorized" },
          statusCode: { type: "integer", example: HttpStatus.UNAUTHORIZED },
        },
      },
    }),
  );
}
