"use client";

import { Menu } from "@mui/material";
import { PropsWithChildren } from "react";
import { useMenu } from "./provider";

interface MenuContentProps extends PropsWithChildren {}

export default function MenuContent(props: MenuContentProps) {
  const { anchorEl, open, close } = useMenu();

  return (
    <Menu open={open} anchorEl={anchorEl} onClose={close}>
      {props.children}
    </Menu>
  );
}
