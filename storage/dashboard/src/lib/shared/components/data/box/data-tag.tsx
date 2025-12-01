import { Chip } from "@mui/material";
import { DataValue } from "./interface";

export interface DataTagProps extends DataValue {}

export default function DataTag({ value }: DataTagProps) {
  const str = String(value);

  return <Chip label={str} />;
}
