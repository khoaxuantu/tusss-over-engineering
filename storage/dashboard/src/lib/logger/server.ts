import "server-only";

import colors from "@colors/colors";
import { Environment } from "@lib/configs/server";
import util from "util";
import winston from "winston";

interface LoggerOptions extends winston.LoggerOptions {}

const format = winston.format;
const console = new winston.transports.Console();

class UtilFormatter {
  transform: winston.Logform.TransformFunction = (info: winston.Logform.TransformableInfo) => {
    const args = info[Symbol.for("splat")];
    if (args) info.message = util.format(info.message, ...(args as any));
    return info;
  };
}

export class Logger {
  private _logger: winston.Logger;

  constructor(ctx: string, options?: LoggerOptions) {
    if (Environment == "development") {
      this._logger = winston.createLogger({
        format: format.combine(
          format.colorize(),
          format.timestamp(),
          format.label({ label: ctx }),
          new UtilFormatter(),
          format.printf(({ level, message, label, timestamp }) => {
            return `${timestamp} [${level}]${colors.blue(`[${label}]`)} ${message}`;
          }),
        ),
        level: "debug",
        ...options,
      });
    } else {
      this._logger = winston.createLogger({
        format: format.combine(format.timestamp(), format.json()),
        level: Environment == "production" ? "info" : "debug",
      });
    }

    this._logger.add(console);
  }

  info(msg: string, ...args: any[]) {
    this._logger.info(msg, ...args);
  }

  error(msg: string, ...args: any[]) {
    this._logger.error(msg, ...args);
  }

  warn(msg: string, ...args: any[]) {
    this._logger.warn(msg, ...args);
  }

  debug(msg: string, ...args: any[]) {
    this._logger.debug(msg, ...args);
  }

  verbose(msg: string, ...args: any[]) {
    this._logger.verbose(msg, ...args);
  }
}

export const logger = new Logger("default");
