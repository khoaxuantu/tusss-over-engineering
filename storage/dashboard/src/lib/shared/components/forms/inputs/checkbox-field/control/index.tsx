import { Checkbox, FormControlLabel } from "@mui/material";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { CheckboxFieldProps } from "..";

interface Props<TFieldValues extends FieldValues> extends CheckboxFieldProps {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
}

export default function CheckboxFieldControl<TFieldValues extends FieldValues = FieldValues>(
  props: Props<TFieldValues>,
) {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field }) => (
        <FormControlLabel
          {...props.labelProps}
          label={props.label}
          control={<Checkbox {...field} checked={field.value} {...props.inputProps} />}
        />
      )}
    />
  );
}
