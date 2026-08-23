export declare type ClassConstructor<T> = {
  new (...args: any[]): T;
};

export type KeyOrString<TObject> = keyof TObject | (string & {});
