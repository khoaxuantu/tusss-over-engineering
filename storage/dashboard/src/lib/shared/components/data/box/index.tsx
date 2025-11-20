import { Box, BoxProps, Typography, TypographyProps } from "@mui/material";
import React from "react";

interface DataBoxProps {
  boxProps?: BoxProps;
  labelProps?: TypographyProps;
  valueProps?: TypographyProps;
  label: string;
  value?: string | number | boolean;
  variant?: "text" | "email" | "number" | "date" | "tag" | "boolean" | "url";
  children?: React.ReactNode;
}

export default function DataBox({
  boxProps,
  labelProps,
  label,
  value,
  variant = "text",
  valueProps,
  children,
}: DataBoxProps) {
  return (
    <>
      {(value || variant == "boolean") && (
        <Box {...boxProps}>
          <Typography variant="h6" {...labelProps}>
            {label}
          </Typography>
          {children || <>{value}</>}
        </Box>
      )}
    </>
  );
}
