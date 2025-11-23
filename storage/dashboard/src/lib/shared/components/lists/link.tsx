"use client";

import { ListItemButton, ListItemButtonProps } from "@mui/material";
import NextLink from "next/link";

interface Props extends ListItemButtonProps<"a"> {}

export default function ListItemLink(props: Props) {
  return <ListItemButton component={NextLink} {...props} />;
}
