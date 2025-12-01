"use client";

import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { ListItemButton, ListItemButtonProps } from "@mui/material";
import { useContext } from "react";
import { ListGroupContext } from "./provider";

type Props = ListItemButtonProps;

export default function ListItemGroupTrigger(props: Props) {
  const { toggle, open } = useContext(ListGroupContext);

  return (
    <ListItemButton onClick={toggle} {...props}>
      {props.children}
      {open ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
  );
}
