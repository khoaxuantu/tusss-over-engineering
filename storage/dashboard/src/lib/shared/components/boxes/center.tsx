import { Box, BoxProps } from "@mui/material";

export function BoxCenter(props: BoxProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100dvh",
      }}
      {...props}
    />
  );
}

export function BoxCenterAbsolute(props: BoxProps) {
  return (
    <Box
      sx={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
      {...props}
    />
  );
}
