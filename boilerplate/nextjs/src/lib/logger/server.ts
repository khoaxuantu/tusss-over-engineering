import "server-only";

import colors from "@colors/colors";
import util, { inspect, InspectOptions } from "util";
import winston from "winston";
import { Config } from "../config/server";

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

const internalLogger =
  Config.env === "development"
    ? winston.createLogger({
        format: format.combine(
          format.colorize(),
          format.timestamp(),
          new UtilFormatter(),
          format.printf(({ level, message, label, timestamp }) => {
            return `${timestamp} [${level}]${colors.blue(`[${label}]`)} ${message}`;
          }),
        ),
        level: "debug",
      })
    : winston.createLogger({
        format: format.combine(format.timestamp(), format.json()),
        level: Config.env == "production" ? "info" : "debug",
      });

internalLogger.add(console);

export class Logger {
  private _logger: winston.Logger;

  constructor(ctx: string, options?: LoggerOptions) {
    this._logger = internalLogger.child({ ...options, label: ctx });
  }

  static deep(obj: any, opts?: InspectOptions) {
    return inspect(obj, {
      depth: 5,
      colors: true,
      sorted: true,
      breakLength: 175,
      numericSeparator: true,
      ...opts,
    });
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
