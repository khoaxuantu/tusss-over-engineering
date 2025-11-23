"use client";

import { createContext, MouseEvent, PropsWithChildren, useContext, useState } from "react";

interface MenuContextProps {
  click: (e: MouseEvent<HTMLButtonElement>) => void;
  close: () => void;
  open: boolean;
  anchorEl: HTMLElement | null;
}

const MenuContext = createContext<MenuContextProps>({
  anchorEl: null,
  click: () => {},
  close: () => {},
  open: false,
});

export function MenuRoot({ children }: PropsWithChildren) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = !!anchorEl;

  const click = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const close = () => {
    setAnchorEl(null);
  };

  return (
    <MenuContext.Provider value={{ click, close, open, anchorEl }}>{children}</MenuContext.Provider>
  );
}

export function useMenu() {
  return useContext(MenuContext);
}
