import Link from "../../links";
import { DataValue } from "./interface";

export interface DataEmailProps extends DataValue {}

export default function DataEmail({ value }: DataEmailProps) {
  if (!value) return <>N/A</>;
  if (typeof value != "string") return <>Invalid Email</>;

  return <Link href={`mailto:${value}`}>{value}</Link>;
}
