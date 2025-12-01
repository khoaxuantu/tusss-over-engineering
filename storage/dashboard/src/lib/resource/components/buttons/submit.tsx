"use client";

import { RocketLaunch } from "@mui/icons-material";
import { Button } from "@mui/material";
import { PropsWithChildren } from "react";
import { useFormContext } from "react-hook-form";

interface SubmitButtonProps extends PropsWithChildren {}

export default function SubmitButton(props: SubmitButtonProps) {
  const { formState } = useFormContext();
  const { isDirty, isSubmitting, isLoading } = formState;

  return (
    <Button
      type="submit"
      variant="contained"
      startIcon={<RocketLaunch />}
      disabled={!isDirty}
      loading={isSubmitting || isLoading}
    >
      {props.children || "Submit"}
    </Button>
  );
}
