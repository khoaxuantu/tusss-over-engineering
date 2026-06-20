import { Stack } from "@mui/material";
import { PropsWithChildren } from "react";

interface TemplateShowProps extends PropsWithChildren {
  my?: number;
  gap?: number;
  component: "section" | "div" | "dl";
}

export default function TemplateShow(props: TemplateShowProps) {
  return (
    <Stack
      component={props.component}
      direction="column"
      sx={{
        gap: props.gap,
        my: props.my,
        "& .data-group > .body": { p: 2, borderRadius: "var(--mui-shape-radius-4)" },
      }}
    >
      {props.children}
    </Stack>
  );
}
