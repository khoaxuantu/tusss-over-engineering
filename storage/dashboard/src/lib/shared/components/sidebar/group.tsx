"use client";

import { JSX, PropsWithChildren, useContext } from "react";
import { ListItemGroup } from "../lists/group/provider";
import { SidebarContext } from "./root";

interface SidebarGroupProps extends PropsWithChildren {
  trigger: JSX.Element;
  activePaths?: string[];
}

export default function SidebarGroup(props: SidebarGroupProps) {
  const { pathName } = useContext(SidebarContext);
  const isActive = !!props.activePaths?.some((path) => pathName.includes(path));

  return (
    <ListItemGroup trigger={props.trigger} defaultOpen={isActive}>
      {props.children}
    </ListItemGroup>
  );
}
