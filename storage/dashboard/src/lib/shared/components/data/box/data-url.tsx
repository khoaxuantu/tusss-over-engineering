import Link from "../../links";
import { DataValue } from "./interface";

export interface DataUrlProps extends DataValue {
  text?: string;
  pathPrefix?: string;
}

export default function DataUrl({ value, text, pathPrefix }: DataUrlProps) {
  if (typeof value != "string") return <>N/A</>;

  let href = value;
  if (pathPrefix) href = `${pathPrefix}/${value}`;

  return <Link href={href}>{text || value}</Link>;
}
