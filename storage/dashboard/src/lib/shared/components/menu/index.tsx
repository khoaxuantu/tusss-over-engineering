import { ButtonProps } from "@mui/material";
import { PropsWithChildren } from "react";
import MenuContent from "./content";
import { MenuRoot } from "./provider";
import MenuTrigger from "./trigger";

interface DropdownProps extends PropsWithChildren {
  label: string;
  buttonProps?: ButtonProps;
}

export default function Menu(props: DropdownProps) {
  return (
    <MenuRoot>
      <MenuTrigger slotProps={props.buttonProps}>{props.label}</MenuTrigger>
      <MenuContent>{props.children}</MenuContent>
    </MenuRoot>
  );
}
