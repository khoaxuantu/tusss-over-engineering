import { DbErrorAdapter } from "@/shared/db/modules/exceptions";
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { formatErrWithStack } from "@tusss/core";
import { DatabaseError } from "pg";
import { TusssRequest } from "../types/common";

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  private logger = new Logger("CatchAll");
  private fallback = new InternalServerErrorException();

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    let httpStatus: HttpStatus;
    let resData: object | string;
    const req = ctx.getRequest<TusssRequest>();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const path = httpAdapter.getRequestUrl(req);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const method = httpAdapter.getRequestMethod(req);

    if (exception instanceof DatabaseError) {
      const err = DbErrorAdapter.toHttpException(exception);
      httpStatus = err.getStatus();
      resData = err.getResponse();
      this.logger.error(`[${method} ${path}] DatabaseError: ${JSON.stringify(resData)}`);
    } else if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      resData = exception.getResponse();
      this.logger.error(`[${method} ${path}] HttpException: ${JSON.stringify(resData)}`);
    } else {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      resData = this.fallback.getResponse();

      if (exception instanceof Error) {
        this.logger.error(`[${method} ${path}] UnexpectedError: ${formatErrWithStack(exception)}`);
      } else {
        this.logger.error(`[${method} ${path}] UnknownError`, exception);
      }
    }

    httpAdapter.reply(ctx.getResponse(), resData, httpStatus);
  }
}
