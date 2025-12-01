"use client";

import { ExpandMore } from "@mui/icons-material";
import { Button, ButtonProps, IconButton, IconButtonProps } from "@mui/material";
import { PropsWithChildren } from "react";
import { useMenu } from "./provider";

type MenuTriggerProps = PropsWithChildren<
  | { component: "icon"; slotProps?: IconButtonProps }
  | { component?: "button"; slotProps?: ButtonProps }
>;

export default function MenuTrigger(props: MenuTriggerProps) {
  const { open, click } = useMenu();

  if (props.component == "icon") {
    return (
      <IconButton onClick={click} {...props.slotProps}>
        {props.children}
      </IconButton>
    );
  }

  return (
    <Button
      aria-controls={open ? "basic-menu" : undefined}
      aria-haspopup="true"
      aria-expanded={open ? "true" : undefined}
      onClick={click}
      variant="contained"
      endIcon={<ExpandMore />}
      {...props.slotProps}
    >
      {props.children}
    </Button>
  );
}
