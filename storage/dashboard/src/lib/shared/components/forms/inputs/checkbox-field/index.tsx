import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormHelperText,
} from "@mui/material";
import { ReactNode } from "react";

export interface CheckboxFieldProps {
  label: React.ReactNode;
  labelProps?: Omit<FormControlLabelProps, "control" | "label">;
  inputProps?: CheckboxProps;
  errorText?: ReactNode;
}

export default function CheckboxField(props: CheckboxFieldProps) {
  return (
    <FormControl error={!!props.errorText}>
      <FormControlLabel
        {...props.labelProps}
        label={props.label}
        control={<Checkbox {...props.inputProps} />}
      />
      {props.errorText && <FormHelperText>{props.errorText}</FormHelperText>}
    </FormControl>
  );
}
