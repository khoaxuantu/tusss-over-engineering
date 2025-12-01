"use client";

import { Redo } from "@mui/icons-material";
import { Button, Drawer } from "@mui/material";
import { PropsWithChildren } from "react";
import { useDrawer } from "./root";

interface DrawerContentProps extends PropsWithChildren {}

export default function DrawerContent({ children }: DrawerContentProps) {
  const { open, toggle } = useDrawer();

  return (
    <Drawer open={open} onClose={toggle} sx={{ position: "relative", paddingTop: 4 }}>
      <Button variant="contained" onClick={toggle} sx={{ borderRadius: 0 }}>
        <Redo />
      </Button>
      {children}
    </Drawer>
  );
}
