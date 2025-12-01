import Link from "@lib/shared/components/links";
import { Box, Breadcrumbs, Stack, Typography } from "@mui/material";
import { JSX } from "react";

interface ResourceBreadcrumbProps {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

interface ResourceHeaderProps {
  title: string;
  actions?: JSX.Element;
  breadcrumbs?: ResourceBreadcrumbProps[];
}

export default function ResourceHeader(props: ResourceHeaderProps) {
  return (
    <Box component="header" mb={4}>
      <BreadcrumbBlock breadcrumbs={props.breadcrumbs} />
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h2" component="h2">
          {props.title}
        </Typography>
        {props.actions}
      </Stack>
    </Box>
  );
}

function BreadcrumbBlock(props: Pick<ResourceHeaderProps, "breadcrumbs">) {
  if (!props.breadcrumbs?.length) return null;

  return (
    <Breadcrumbs component="nav" sx={{ marginBottom: 2 }} separator=">">
      {props.breadcrumbs.map((item) => {
        if (item.isCurrent) {
          return (
            <mark key={item.label}>
              <b>{item.label}</b>
            </mark>
          );
        }

        return (
          <Link key={item.label} href={item.href || ""}>
            {item.label}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
