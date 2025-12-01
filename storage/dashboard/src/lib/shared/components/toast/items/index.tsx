import Alert, { AlertProps } from "@mui/material/Alert";
import SnackbarRoot, { SnackbarProps } from "@mui/material/Snackbar";

export interface ToastItemProps extends SnackbarProps {
  variant?: AlertProps["severity"];
}

export default function ToastItem(props: ToastItemProps) {
  const { variant, message, onClose, ...snackbarProps } = props;

  return (
    <SnackbarRoot {...snackbarProps} onClose={onClose}>
      <Alert
        variant="filled"
        severity={variant || "info"}
        onClose={onClose ? (e) => onClose(e, "escapeKeyDown") : undefined}
      >
        {message}
      </Alert>
    </SnackbarRoot>
  );
}
