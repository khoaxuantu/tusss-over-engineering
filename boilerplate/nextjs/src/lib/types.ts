import { BaseSyntheticEvent } from "react";

export type KeyOrString<K extends string | number | symbol> = K | (string & {});

export interface FormContextProps {
  onSubmit: (e?: BaseSyntheticEvent) => void;
}
