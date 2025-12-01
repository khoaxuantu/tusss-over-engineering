import { Delete } from "@mui/icons-material";
import { Box, Divider, IconButton, ListItem, TextField, Typography } from "@mui/material";
import { Meta, StoryObj } from "@storybook/nextjs";
import { useForm } from "react-hook-form";
import ListField, { ListFieldProps } from ".";

interface Test {
  firstname: string;
  lastname: string;
}

interface StoryPayload {
  test: Test[];
}

/**
 * A custom component to handle an array field in form.
 *
 * Under the hood, the component wraps the following components:
 *
 * - [React Hook Form's `useFieldArray`](https://www.react-hook-form.com/api/usefieldarray/)
 * - [MUI's `FormControl`](https://mui.com/material-ui/api/form-control/)
 * - [MUI's `FormGroup`](https://mui.com/material-ui/api/form-group/)
 * - [MUI's `List`](https://mui.com/material-ui/react-list/)
 */
const meta: Meta<typeof ListField> = {
  title: "Shared/Form/Inputs/ListField",
  component: ListField,
  tags: ["autodocs"],
  argTypes: {
    label: {
      description: "A label (legend tag) for this form group",
    },
    arrControl: {
      description: "An input object for the `useFieldArray` hook",
    },
    newItem: {
      description:
        "An inital payload for each newly item created when users click on the add button.",
    },
    renderItems: {
      description:
        "A function to render the main display list. \n\nIt takes the `fields` object and `remove` function from the `useFieldArray` hook. \n\nThe `fields` is used for rendering the list items corresponded to the array state that being controlled. \n\nThe `remove` is used for the delete button in each list item.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ListField>;

function TextListComponent() {
  const { register, control, watch } = useForm<StoryPayload>({
    defaultValues: {
      test: [
        { firstname: "Xuan Khoa Tu", lastname: "Nguyen" },
        { firstname: "Dinh Tuong", lastname: "Nguyen" },
      ],
    },
  });
  const test = watch("test");

  const renderItems: ListFieldProps<StoryPayload>["renderItems"] = (fields, remove) => {
    return (
      <>
        {fields.map((item, index) => {
          return (
            <ListItem
              key={item.id}
              sx={{ flexWrap: "wrap", gap: 1 }}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => remove(index)}>
                  <Delete />
                </IconButton>
              }
            >
              <TextField label="First name" {...register(`test.${index}.firstname`)} />
              <TextField label="Last name" {...register(`test.${index}.lastname`)} />
            </ListItem>
          );
        })}
      </>
    );
  };

  return (
    <>
      <Box component="section" mb={4}>
        <Typography>State "test":</Typography>
        {test.map((t, index) => (
          <Typography key={index}>{JSON.stringify(t)}</Typography>
        ))}
      </Box>
      <Divider sx={{ mb: 4 }} />
      <ListField<StoryPayload>
        label="User name"
        arrControl={{ name: "test", control }}
        newItem={{ firstname: "", lastname: "" }}
        renderItems={renderItems}
      />
    </>
  );
}

export const TextList: Story = {
  render: () => <TextListComponent />,
};
