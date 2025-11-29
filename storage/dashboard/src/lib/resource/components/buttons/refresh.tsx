import { Refresh } from "@mui/icons-material";
import { Button } from "@mui/material";
import { PropsWithChildren } from "react";
import { useFormContext } from "react-hook-form";

interface RefreshButton extends PropsWithChildren {}

export default function RefreshButton(props: RefreshButton) {
  const { reset } = useFormContext();

  const resetHandler = () => {
    reset();
  };

  return (
    <Button variant="outlined" startIcon={<Refresh />} onClick={resetHandler}>
      {props.children || "Refresh"}
    </Button>
  );
}
