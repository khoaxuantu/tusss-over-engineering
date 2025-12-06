export interface SortParams<TField extends string> {
  field: TField;
  direction: "asc" | "desc";
}

export class Sort<TField extends string = "id"> implements SortParams<TField> {
  field: TField;
  direction: "asc" | "desc";

  constructor(data?: SortParams<TField>) {
    this.field = data?.field ?? ("id" as TField);
    this.direction = data?.direction ?? "asc";
  }
}
