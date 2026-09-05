export function sanitizeObject(params: any) {
  return JSON.parse(JSON.stringify(params));
}

export function parseUpdateValues<
  TDirtyFields extends Partial<Record<string, unknown>>,
  TValues extends Partial<Record<keyof TDirtyFields, unknown>>,
>(dirtyFields: TDirtyFields, data: TValues): Partial<TValues> {
  const obj: Partial<Record<string, any>> = {};

  Object.keys(dirtyFields).forEach((key) => {
    if (!dirtyFields[key]) return;
    const val = data[key];

    if (Array.isArray(data[key]) || val instanceof Date || val === undefined || val === null) {
      obj[key] = val;
      return;
    }

    if (typeof val == "object") {
      obj[key] = parseUpdateValues(dirtyFields[key], val as TValues);
      return;
    }

    obj[key] = val;
  });

  return obj as TValues;
}
