"use client";

import { Button, ButtonProps, IconButton, IconButtonProps } from "@mui/material";
import { PropsWithChildren } from "react";
import { useDrawer } from "./root";

type DrawerTriggerProps = PropsWithChildren<
  | { component: "icon"; slotProps?: IconButtonProps }
  | { component?: "button"; slotProps?: ButtonProps }
>;

export default function DrawerTrigger(props: DrawerTriggerProps) {
  const { toggle } = useDrawer();

  if (props.component == "icon") {
    return (
      <IconButton onClick={toggle} {...props.slotProps}>
        {props.children}
      </IconButton>
    );
  }

  return (
    <Button onClick={toggle} {...props.slotProps}>
      {props.children}
    </Button>
  );
}
