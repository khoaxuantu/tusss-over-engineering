export function enumToArray<T extends number | string>(obj: Record<string, any>): T[] {
  return Object.values<T>(obj);
}
