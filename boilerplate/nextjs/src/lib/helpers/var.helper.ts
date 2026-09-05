const falsy = [undefined, null, false, NaN, 0, -0, 0n, ""];

export function isFalsy(value: any) {
  return falsy.includes(value);
}
