import { isFalsy } from "@lib/shared/helpers/var.helper";
import { Check, Close } from "@mui/icons-material";
import { Chip } from "@mui/material";
import { DataValue } from "./interface";

export interface DataBooleanProps extends DataValue {}

export default function DataBoolean({ value }: DataBooleanProps) {
  const falsy = isFalsy(value);
  if (falsy) {
    return <Chip label="False" icon={<Close />} size="small" color="error" variant="outlined" />;
  }
  return <Chip label="True" icon={<Check />} size="small" color="success" variant="outlined" />;
}
