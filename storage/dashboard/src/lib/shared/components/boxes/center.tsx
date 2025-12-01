import { Box, BoxProps } from "@mui/material";

export function BoxCenter(props: BoxProps) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" {...props} />
  );
}

export function BoxCenterAbsolute(props: BoxProps) {
  return (
    <Box
      position="absolute"
      left="50%"
      top="50%"
      sx={{
        transform: "translate(-50%, -50%)",
      }}
      {...props}
    />
  );
}
