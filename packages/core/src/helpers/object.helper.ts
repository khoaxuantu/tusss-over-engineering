/**
 * Extract the attributes of `objAfter` which are different from the attributes of `objBefore`.
 * These objects have to be flatten to work correctly
 *
 * @param objBefore
 * @param objAfter
 */
export const diffAttrsOfTwoObjs = <T>(
  objBefore: object,
  objAfter: object
): Record<keyof T, { before: any; after: any } | undefined> => {
  const obj = {} as Record<keyof T, { before: any; after: any }>;
  const keys = {} as Record<keyof T, 1>;

  Object.keys(objBefore).forEach((key) => (keys[key] = 1));
  Object.keys(objAfter).forEach((key) => (keys[key] = 1));

  Object.keys(keys).forEach((key) => {
    if (objAfter[key] != objBefore[key]) {
      if (
        Array.isArray(objBefore[key]) &&
        Array.isArray(objAfter[key]) &&
        objBefore[key].length == objAfter[key].length
      )
        return;
      obj[key] = { before: objBefore[key], after: objAfter[key] };
    }
  });

  return obj;
};

/**
 * This method will remove any undefined, function, or symbol property from your object
 */
export function sanitizeObject<T extends object = Record<string, any>>(obj: T): T {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined || typeof obj[key] == "function" || typeof obj[key] == "symbol") {
      delete obj[key];
    } else if (Array.isArray(obj[key])) {
      obj[key] = sanitizeArray(obj[key]);
    } else if (typeof obj[key] == "object" && obj[key] !== null && !(obj[key] instanceof Date)) {
      sanitizeObject(obj[key]);
    }
  });

  return obj;
}

/**
 * This method will remove any undefined, function, or symbol property from your array, including those in nested arrays or objects.
 */
export function sanitizeArray(arr: any[]): any[] {
  const newArr: any[] = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === undefined || typeof arr[i] == "function" || typeof arr[i] == "symbol") {
      continue;
    }

    if (Array.isArray(arr[i])) {
      newArr.push(sanitizeArray(arr[i]));
    } else if (typeof arr[i] == "object" && arr[i] !== null && !(arr[i] instanceof Date)) {
      newArr.push(sanitizeObject(arr[i]));
    } else {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}

export function toPlainObject<T extends object = Record<string, any>>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function transformArrLikeObjToArr<T>(obj: Record<string, T>): T[] {
  return Object.keys(obj)
    .map((key) => parseInt(key, 10))
    .filter((key) => !isNaN(key))
    .sort((a, b) => a - b)
    .map((key) => obj[key])
    .filter((item) => !!item);
}
