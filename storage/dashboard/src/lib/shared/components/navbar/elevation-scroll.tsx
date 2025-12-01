"use client";

import { useScrollTrigger } from "@mui/material";
import { cloneElement, ReactElement } from "react";

interface Props {
  children?: ReactElement<{ sx: { backgroundColor?: string } }>;
}

export default function ElevationScroll(props: Props) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  if (!props.children) return null;

  return cloneElement(props.children, {
    sx: {
      backgroundColor: trigger ? "var(--mui-palette-surface-highest)" : undefined,
    },
  });
}
