export class DecimalPrecision {
  static round(num: number, decimalPlaces: number = 0) {
    const p = Math.pow(10, decimalPlaces);
    const n = num * p * (1 + Number.EPSILON);
    return Math.round(n) / p;
  }

  static ceil(num: number, decimalPlaces: number = 0) {
    const p = Math.pow(10, decimalPlaces);
    const n = num * p * (1 - Math.sign(num) * Number.EPSILON);
    return Math.ceil(n) / p;
  }

  static floor(num: number, decimalPlaces: number) {
    const p = Math.pow(10, decimalPlaces);
    const n = num * p * (1 + Math.sign(num) * Number.EPSILON);
    return Math.floor(n) / p;
  }

  static trunc(num: number, decimalPlaces: number) {
    return (num < 0 ? this.ceil : this.floor)(num, decimalPlaces);
  }

  static toFixed(num: number, decimalPlaces: number) {
    return this.round(num, decimalPlaces).toFixed(decimalPlaces);
  }
}
