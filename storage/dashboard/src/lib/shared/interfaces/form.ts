import { BaseSyntheticEvent } from "react";

export interface FormContextProps {
  onSubmit: (e?: BaseSyntheticEvent) => void;
}
