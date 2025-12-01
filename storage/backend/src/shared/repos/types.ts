export type Id = number | string;

export interface HasPrimaryKey<T extends Id = number> {
  id: T;
}
