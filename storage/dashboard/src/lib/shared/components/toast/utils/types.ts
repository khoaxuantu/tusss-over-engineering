import { AlertProps } from "@mui/material";
import { ToastItemProps } from "../items";

export interface ToastQueueProps {
  max?: number;
}

export interface ToastProps {
  id: number;
  title?: string;
  description?: string;
  variant?: AlertProps["severity"];
  setting?: ToastItemProps;
}

export interface ToastStruct {
  push(props: ToastProps): this;
  pop(): this;
  toArray(): ToastProps[];
  update(id: number, props: Omit<ToastProps, "id">): this;
  remove(id: number): this;
}
