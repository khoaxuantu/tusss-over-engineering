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
      my={props.my}
      gap={props.gap}
      direction="column"
      sx={{
        "& .data-group > .body": { p: 2, borderRadius: "var(--mui-shape-radius-4)" },
      }}
    >
      {props.children}
    </Stack>
  );
}
