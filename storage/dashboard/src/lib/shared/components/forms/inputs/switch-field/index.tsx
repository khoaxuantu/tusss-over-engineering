import { FormControlLabel, FormControlLabelProps, Switch } from "@mui/material";

export default function SwitchField(props: Omit<FormControlLabelProps, "control">) {
  return <FormControlLabel {...props} control={<Switch />} />;
}
