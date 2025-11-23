"use client";

import { Collapse, List } from "@mui/material";
import { createContext, JSX, PropsWithChildren, useState } from "react";

interface Props extends PropsWithChildren {
  trigger: JSX.Element;
}

interface ListGroupContextProps {
  open: boolean;
  toggle: () => void;
}

export const ListGroupContext = createContext<ListGroupContextProps>({
  open: false,
  toggle: () => {},
});

export function ListItemGroup(props: Props) {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  return (
    <ListGroupContext.Provider value={{ open, toggle }}>
      {props.trigger}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List disablePadding>{props.children}</List>
      </Collapse>
    </ListGroupContext.Provider>
  );
}
