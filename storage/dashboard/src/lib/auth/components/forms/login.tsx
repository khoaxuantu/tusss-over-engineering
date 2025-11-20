"use client";

import { LoginContext } from "@lib/auth/providers/login/form";
import { LoginFormData } from "@lib/auth/schemas/login";
import { Button, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useContext } from "react";
import { Controller, useFormContext } from "react-hook-form";

export default function LoginForm() {
  const {
    control,
    formState: { isLoading },
  } = useFormContext<LoginFormData>();
  const { onSubmit } = useContext(LoginContext);

  return (
    <Stack component="form" spacing={2} onSubmit={onSubmit}>
      <Controller
        control={control}
        name="email"
        render={({ field, fieldState: { error } }) => {
          return (
            <TextField
              required
              label="Email"
              type="email"
              placeholder="abc@example.com"
              error={!!error}
              helperText={error?.message}
              {...field}
            />
          );
        }}
      />
      <Controller
        control={control}
        name="password"
        render={({ field, fieldState: { error } }) => (
          <TextField
            required
            label="Password"
            type="password"
            placeholder="********"
            error={!!error}
            helperText={error?.message}
            {...field}
          />
        )}
      />
      <Button type="submit" variant="outlined" loading={isLoading}>
        Login
      </Button>
    </Stack>
  );
}
