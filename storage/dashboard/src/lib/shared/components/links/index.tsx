"use client";

import MuiLink, { LinkProps } from "@mui/material/Link";
import NextLink from "next/link";

interface Props extends Omit<LinkProps<"a">, "href"> {
  href: string;
}

export default function Link(props: Props) {
  return <MuiLink {...props} component={NextLink} />;
}
