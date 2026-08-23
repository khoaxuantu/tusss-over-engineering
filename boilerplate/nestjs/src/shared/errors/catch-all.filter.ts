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
import { ErrorBase } from "@tusss/ood";

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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const req = ctx.getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const path = httpAdapter.getRequestUrl(req);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const method = httpAdapter.getRequestMethod(req);
    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      resData = exception.getResponse();
      this.logger.error(`[${method} ${path}] HttpException: ${JSON.stringify(resData)}`);
    } else {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
      resData = this.fallback.getResponse();

      if (exception instanceof ErrorBase) {
        this.logger.error(`[${method} ${path}] UnexpectedError: ${JSON.stringify(exception)}`);
      } else {
        this.logger.error(`[${method} ${path}] UnknownError`, exception);
      }
    }

    httpAdapter.reply(ctx.getResponse(), resData, httpStatus);
  }
}
