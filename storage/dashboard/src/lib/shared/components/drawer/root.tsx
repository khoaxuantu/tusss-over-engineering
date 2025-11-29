"use client";

import { createContext, PropsWithChildren, useContext, useState } from "react";

interface DrawerRootProps extends PropsWithChildren {}

interface DrawerContextProps {
  toggle: () => void;
  open: boolean;
}

const DrawerContext = createContext<DrawerContextProps>({
  toggle: () => {},
  open: false,
});

export default function DrawerRoot({ children }: DrawerRootProps) {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  return (
    <DrawerContext.Provider
      value={{
        toggle,
        open,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
}

export function useDrawer() {
  return useContext(DrawerContext);
}
