import Alert, { AlertProps } from "@mui/material/Alert";
import SnackbarRoot, { SnackbarProps } from "@mui/material/Snackbar";

interface Props extends SnackbarProps {
  variant?: AlertProps["severity"];
}

export default function Snackbar(props: Props) {
  const { variant, message, ...snackbarProps } = props;

  return (
    <SnackbarRoot {...snackbarProps}>
      <Alert severity={variant}>{message}</Alert>
    </SnackbarRoot>
  );
}

export function SnackbarError(props: SnackbarProps) {
  return (
    <SnackbarRoot {...props}>
      <Alert severity="error">{props.message}</Alert>
    </SnackbarRoot>
  );
}

export function SnackbarInfo(props: SnackbarProps) {
  return (
    <SnackbarRoot {...props}>
      <Alert severity="info">{props.message}</Alert>
    </SnackbarRoot>
  );
}

export function SnackbarWarning(props: SnackbarProps) {
  return (
    <SnackbarRoot {...props}>
      <Alert severity="warning">{props.message}</Alert>
    </SnackbarRoot>
  );
}

export function SnackbarSuccess(props: SnackbarProps) {
  return (
    <SnackbarRoot {...props}>
      <Alert severity="success">{props.message}</Alert>
    </SnackbarRoot>
  );
}
