"use client";

import { PropsWithChildren, useContext } from "react";
import ListItemLink from "../lists/link";
import { SidebarContext } from "./root";

interface SidebarLinkProps extends PropsWithChildren {
  href: string;
}

export default function SidebarLink(props: SidebarLinkProps) {
  const { pathName } = useContext(SidebarContext);
  const isActive = pathName.includes(props.href);

  return (
    <ListItemLink href={props.href} selected={isActive}>
      {props.children}
    </ListItemLink>
  );
}
