import { Add } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormControlProps,
  FormGroup,
  FormLabel,
  List,
  ListProps,
} from "@mui/material";
import { JSX } from "react";
import {
  ArrayPath,
  FieldArray,
  FieldArrayWithId,
  FieldValues,
  useFieldArray,
  UseFieldArrayProps,
  UseFieldArrayRemove,
} from "react-hook-form";

export interface ListFieldProps<TFieldValues extends FieldValues> {
  label: string;
  arrControl: UseFieldArrayProps<TFieldValues>;
  props?: {
    formControl?: FormControlProps;
    list?: ListProps;
  };
  newItem: FieldArray<TFieldValues, ArrayPath<TFieldValues>>;
  renderItems: (
    fields: FieldArrayWithId<TFieldValues, ArrayPath<TFieldValues>, "id">[],
    remove: UseFieldArrayRemove,
  ) => JSX.Element;
}

function CustomList<TFieldValues extends FieldValues>({
  arrControl,
  props,
  renderItems,
  newItem,
}: ListFieldProps<TFieldValues>) {
  const { fields, append, remove } = useFieldArray<TFieldValues>(arrControl);

  return (
    <>
      <List sx={{ "& > li": { paddingLeft: 0 } }} {...props?.list}>
        {renderItems(fields, remove)}
      </List>
      <Button
        variant="outlined"
        sx={{ width: "fit-content" }}
        startIcon={<Add />}
        onClick={() => append(newItem)}
      >
        Add
      </Button>
    </>
  );
}

export default function ListField<TFieldValues extends FieldValues>(
  props: ListFieldProps<TFieldValues>,
) {
  return (
    <FormControl component="fieldset" {...props.props?.formControl}>
      <FormLabel component="legend">{props.label}</FormLabel>
      <FormGroup>
        <CustomList<TFieldValues> {...props} />
      </FormGroup>
    </FormControl>
  );
}
