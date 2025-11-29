import { Box, BoxProps, TableCell, TableRow, Typography } from "@mui/material";
import { ReactNode } from "react";
import DataBoolean, { DataBooleanProps } from "./data-boolean";
import DataDate, { DataDateProps } from "./data-date";
import DataEmail, { DataEmailProps } from "./data-email";
import DataNumber, { DataNumberProps } from "./data-number";
import DataTag, { DataTagProps } from "./data-tag";
import DataText, { DataTextProps } from "./data-text";
import DataUrl, { DataUrlProps } from "./data-url";

type Props = {
  boxProps?: BoxProps;
  label: string;
  layout?: "inline" | "flat" | "tr";
} & (
  | { variant?: undefined; children: ReactNode }
  | ({ variant: "text" } & DataTextProps)
  | ({ variant: "email" } & DataEmailProps)
  | ({ variant: "number" } & DataNumberProps)
  | ({ variant: "date" } & DataDateProps)
  | ({ variant: "tag" } & DataTagProps)
  | ({ variant: "boolean" } & DataBooleanProps)
  | ({ variant: "url" } & DataUrlProps)
);

export default function DataBox(props: Props) {
  switch (props.layout) {
    case "inline":
      return <DataBoxInline {...props} />;
    case "flat":
      return <DataBoxFlat {...props} />;
    case "tr":
      return <DataBoxTr {...props} />;
  }

  return (
    <Box {...props.boxProps}>
      <Typography variant="h6" component="dt" mb={0.5}>
        {props.label}
      </Typography>
      <Box component="dd">
        <Field {...props} />
      </Box>
    </Box>
  );
}

function DataBoxInline(props: Props) {
  return (
    <Box
      display="inline-flex"
      alignItems="center"
      flexWrap="wrap"
      gap={1}
      overflow="auto"
      {...props.boxProps}
    >
      <dt>
        <b>{props.label}:</b>
      </dt>
      <dd>
        <Field {...props} />
      </dd>
    </Box>
  );
}

function DataBoxFlat(props: Props) {
  return (
    <>
      <dt>
        <b>{props.label}</b>
      </dt>
      <dd>
        <Field {...props} />
      </dd>
    </>
  );
}

function DataBoxTr(props: Props) {
  return (
    <TableRow>
      <TableCell component="th">
        <b>{props.label}</b>
      </TableCell>
      <TableCell>
        <Field {...props} />
      </TableCell>
    </TableRow>
  );
}

function Field(props: Props) {
  switch (props.variant) {
    case "text":
      return <DataText {...props} />;

    case "boolean":
      return <DataBoolean {...props} />;

    case "date":
      return <DataDate {...props} />;

    case "email":
      return <DataEmail {...props} />;

    case "number":
      return <DataNumber {...props} />;

    case "tag":
      return <DataTag {...props} />;

    case "url":
      return <DataUrl {...props} />;

    case undefined:
    default:
      return <>{props.children}</>;
  }
}
