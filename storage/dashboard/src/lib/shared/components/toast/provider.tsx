"use client";

import { SnackbarProps } from "@mui/material/Snackbar";
import { createContext, PropsWithChildren, useContext, useRef, useState } from "react";
import Snackbar from "./items";
import { ToastQueue } from "./utils/queue";
import { ToastProps } from "./utils/types";

interface ToastContextProps {
  push: (props: ToastProps) => void;
  pop: () => void;
  toast?: ToastProps;
  setting: SnackbarProps;
}

interface ToastProviderProps extends PropsWithChildren {
  setting?: SnackbarProps;
}

export const ToastContext = createContext<ToastContextProps>({
  push: () => {},
  pop: () => {},
  setting: {},
});

export function ToastProvider(props: ToastProviderProps) {
  const setting = props.setting || {
    autoHideDuration: 5000,
  };

  const queue = useRef(new ToastQueue());
  const [toast, setToast] = useState<ToastProps | undefined>(undefined);

  const push = (props: ToastProps) => {
    queue.current.push(props);
    if (!toast) setToast(queue.current.peak);
  };

  const pop = () => {
    queue.current.pop();
    setToast(queue.current.peak);
  };

  return (
    <ToastContext.Provider value={{ push, pop, setting, toast }}>
      {props.children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

function ToastContainer() {
  const { toast, pop, setting } = useContext(ToastContext);

  if (!toast) return null;

  const finalSetting = toast.setting || setting;

  return (
    <Snackbar
      key={toast.id}
      variant={toast.variant}
      message={
        <>
          <b>{toast.title}</b>
          <br />
          {toast.description}
        </>
      }
      onClose={(_, reason) => {
        if (reason == "clickaway") return;
        pop();
      }}
      open
      {...finalSetting}
    />
  );
}
