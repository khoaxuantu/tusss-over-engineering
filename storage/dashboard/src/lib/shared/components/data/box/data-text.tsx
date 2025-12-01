import { DataValue } from "./interface";

export interface DataTextProps extends DataValue {}

export default function DataText({ value }: DataTextProps) {
  return <>{String(value || "N/A")}</>;
}
