"use client";

import SubmitButton from "@lib/resource/components/buttons/submit";
import { CityRowData } from "@lib/resource/locations/cities/schemas";
import { DistrictRowData } from "@lib/resource/locations/districts/schemas";
import { MenuItem, Stack, TextField } from "@mui/material";
import { useContext } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { StoreNewContext } from "../../providers/new.provider";
import { StoreNewFormData } from "../../schemas";

interface Props {
  cityOpts: CityRowData[];
  districtOpts: DistrictRowData[];
}

export default function StoreNewForm({ cityOpts, districtOpts }: Props) {
  const { control } = useFormContext<StoreNewFormData>();
  const { onSubmit } = useContext(StoreNewContext);

  return (
    <Stack component="form" spacing={4} onSubmit={onSubmit}>
      <Stack direction={{ md: "row" }} spacing={2}>
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState: { error } }) => {
            return (
              <TextField
                {...field}
                label="Name"
                error={!!error}
                helperText={error?.message}
                autoComplete="off"
                required
              />
            );
          }}
        />
        <Controller
          control={control}
          name="type"
          render={({ field, fieldState: { error } }) => {
            return (
              <TextField
                {...field}
                label="Type"
                error={!!error}
                helperText={error?.message}
                select
                required
              >
                <MenuItem value="AUTH">Auth</MenuItem>
                <MenuItem value="RETAIL">Retail</MenuItem>
              </TextField>
            );
          }}
        />
      </Stack>
      <Stack direction={{ md: "row" }} spacing={2}>
        <Controller
          control={control}
          name="city_id"
          render={({ field, fieldState: { error } }) => {
            return (
              <TextField
                {...field}
                label="City ID"
                error={!!error}
                helperText={error?.message}
                autoComplete="off"
                required
                select
              >
                {cityOpts.map((opt) => (
                  <MenuItem key={opt.id} value={opt.id}>
                    {opt.name}
                  </MenuItem>
                ))}
              </TextField>
            );
          }}
        />
        <Controller
          control={control}
          name="district_id"
          render={({ field, fieldState: { error } }) => {
            return (
              <TextField
                {...field}
                label="District ID"
                error={!!error}
                helperText={error?.message}
                autoComplete="off"
                required
                select
              >
                {districtOpts.map((opt) => (
                  <MenuItem key={opt.id} value={opt.id}>
                    {opt.name}
                  </MenuItem>
                ))}
              </TextField>
            );
          }}
        />
      </Stack>
      <Controller
        control={control}
        name="href"
        render={({ field, fieldState: { error } }) => {
          return (
            <TextField
              {...field}
              label="Href"
              error={!!error}
              helperText={error?.message}
              autoComplete="off"
              fullWidth
            />
          );
        }}
      />
      <SubmitButton />
    </Stack>
  );
}
