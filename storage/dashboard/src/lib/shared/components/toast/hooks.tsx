import { useContext } from "react";
import { ToastContext } from "./provider";
import { ToastProps } from "./utils/types";

export function useToast() {
  const { push } = useContext(ToastContext);

  const toast = (props: Omit<ToastProps, "id">) => {
    push({ id: Date.now(), ...props });
  };

  return toast;
}
