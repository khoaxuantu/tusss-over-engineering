export type KeyOrString<K extends string | number | symbol> = K | (string & {});
