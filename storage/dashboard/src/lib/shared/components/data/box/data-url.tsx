import { LinkProps } from "@mui/material";
import Link from "../../links";
import { DataValue } from "./interface";

export interface DataUrlProps extends DataValue {
  text?: string;
  pathPrefix?: string;
  linkProps?: Omit<LinkProps<"a">, "href">;
}

export default function DataUrl({ value, text, pathPrefix, linkProps }: DataUrlProps) {
  if (typeof value != "string") return <>N/A</>;

  let href = value;
  if (pathPrefix) href = `${pathPrefix}/${value}`;

  return (
    <Link href={href} {...linkProps}>
      {text || value}
    </Link>
  );
}
