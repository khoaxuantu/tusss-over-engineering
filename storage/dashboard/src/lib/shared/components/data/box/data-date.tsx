import { DateFormatLabel, formatDate } from "@lib/shared/helpers/date.helper";
import { DataValue } from "./interface";

export interface DataDateProps extends DataValue {
  format?: DateFormatLabel;
}

export default function DataDate({ value, format = "full" }: DataDateProps) {
  if (!value || typeof value == "boolean") return <>Invalid Date</>;

  const date = new Date(value);

  return <>{formatDate(date, format)}</>;
}
