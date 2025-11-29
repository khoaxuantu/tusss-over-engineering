"use client";

import { ListItemButton, ListItemButtonProps } from "@mui/material";
import NextLink from "next/link";
import { MouseEvent } from "react";
import { useDrawer } from "../drawer";

interface Props extends ListItemButtonProps<"a"> {}

export default function ListItemLink(props: Props) {
  const { toggle } = useDrawer();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    toggle();
    props.onClick?.(e);
  };

  return <ListItemButton component={NextLink} onClick={handleClick} {...props} />;
}
