import sizeof from "object-sizeof";
import { DecimalPrecision } from "./calc.helper";

export class MonitorHelper {
  static timer() {
    const start = performance.now();
    return {
      stop: () => `${DecimalPrecision.round(performance.now() - start)}ms`,
    };
  }

  static getMemoryUsage() {
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    return `${DecimalPrecision.round(used, 2)} mb`;
  }

  static getSizeOf(obj: any) {
    const size = sizeof(obj);
    if ((size as any) instanceof Error) return "Cannot get the size of the object";

    if (size < 1024) {
      return `${size} bytes`;
    } else if (size < 1024 * 1024) {
      return `${DecimalPrecision.round(size / 1024, 2)} kb`;
    }

    return `${DecimalPrecision.round(size / Math.pow(1024, 2), 2)} mb`;
  }
}
