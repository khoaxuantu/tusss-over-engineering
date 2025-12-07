export declare type ClassConstructor<T> = {
  new (...args: any[]): T;
};

type StringExplicit = string & NonNullable<unknown>;

export type KeyOrString<TObject> = keyof TObject | StringExplicit;

type Primitive =
  | string
  | number
  | boolean
  | Date
  | RegExp
  | symbol
  | Array<string | number | object>;

export type LoosePath<T> = keyof T | StringExplicit;

/**
 * To serialize a deep object to union of keys type, we have to apply recursion to the conditional type inferrence.
 *
 * Because an interface may have circular reference, which can lead to infinite recursion, we can break the circle via
 * recursive graph traversal technique.
 */
type CircularPathGraph = [never, 0, 1];
export type DeepPathRecursive<T, Depth extends 0 | 1 = 1> = [Depth] extends [never] // CircularPathGraph[0] is [never]
  ? never
  : T extends Primitive
  ? never // Return if the type is a primitive
  : {
      [K in keyof T & string]: T[K] extends Primitive
        ? `${K}`
        : `${K}` | `${K}.${DeepPathRecursive<T[K], CircularPathGraph[Depth]>}`; // CircularPathGraph[1] is 0, so a recursive graph traversal is performed
    }[keyof T & string];

export type DeepPath<T> = DeepPathRecursive<T> | StringExplicit;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];
