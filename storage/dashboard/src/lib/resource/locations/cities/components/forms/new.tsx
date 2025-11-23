"use client";

import { Button, Stack, TextField } from "@mui/material";
import { useContext } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CityNewContext } from "../../providers/new.provider";
import { CityNewFormData } from "../../schemas";

export default function CityNewForm() {
  const { control } = useFormContext<CityNewFormData>();
  const { onSubmit } = useContext(CityNewContext);

  return (
    <form onSubmit={onSubmit}>
      <Stack direction={{ md: "row" }} spacing={2} mb={2}>
        <Controller
          name="id"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="ID"
              fullWidth
              error={!!error}
              helperText={
                error?.message || "This ID is used to identify the city record in the database."
              }
              autoComplete="off"
            />
          )}
        />
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Name"
              fullWidth
              error={!!error}
              helperText={error?.message}
              autoComplete="off"
            />
          )}
        />
      </Stack>
      <Button type="submit" variant="contained">
        Submit
      </Button>
    </form>
  );
}
