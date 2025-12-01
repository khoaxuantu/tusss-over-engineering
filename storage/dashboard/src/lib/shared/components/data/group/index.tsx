import { Box, BoxProps, Paper, PaperProps, Typography, TypographyProps } from "@mui/material";
import { PropsWithChildren } from "react";

interface DataGroupProps extends PropsWithChildren {
  label: string;
  labelProps?: TypographyProps;
  boxProps?: BoxProps;
  bodyProps?: PaperProps;
}

export default function DataGroup({
  label,
  children,
  boxProps,
  labelProps,
  bodyProps,
}: DataGroupProps) {
  return (
    <Box {...boxProps} className="data-group">
      <Typography mb={1} {...labelProps}>
        <b>{label}</b>
      </Typography>
      <Paper
        variant="outlined"
        {...bodyProps}
        sx={{
          overflow: "auto",
          ...bodyProps?.sx,
        }}
        className="body"
      >
        {children}
      </Paper>
    </Box>
  );
}
