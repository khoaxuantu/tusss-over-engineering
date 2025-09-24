import { TusssRequest } from "@/shared/types/common";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export function extractUserContext(_: unknown, ctx: ExecutionContext) {
  const request = ctx.switchToHttp().getRequest<TusssRequest>();
  return request.user;
}

export const CurrentUser = createParamDecorator(extractUserContext);
