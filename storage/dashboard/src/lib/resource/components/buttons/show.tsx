import { VisibilityOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { PropsWithChildren } from "react";

interface ButtonShowProps extends PropsWithChildren {}

export function ButtonShow(props: ButtonShowProps) {
  return <Button startIcon={<VisibilityOutlined />}>{props.children || "Show"}</Button>;
}
