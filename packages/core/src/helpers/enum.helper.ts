/**
 * This helper method does not support heterogenous enum
 *
 * For example, it won't work with the enum like this:
 * ```ts
 * enum A {
 *  a = "some string",
 *  b = 123,
 * }
 */
export function enumToArray<T extends number | string>(e: any): T[] {
  const arr = Object.values<T>(e);
  if (typeof arr[arr.length - 1] == "string") return arr;
  return arr.slice(arr.length / 2);
}
