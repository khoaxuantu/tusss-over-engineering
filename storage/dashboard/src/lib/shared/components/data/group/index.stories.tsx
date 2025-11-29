import { List, ListItem } from "@mui/material";
import { Meta, StoryObj } from "@storybook/nextjs";
import DataGroup from ".";
import DataBox from "../box";

/**
 * A custom display component, which is used to display a group of data.
 */
const meta: Meta<typeof DataGroup> = {
  title: "Shared/Data/Data Group",
  component: DataGroup,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DataGroup>;

export const Default: Story = {
  args: {
    label: "Group Label",
    bodyProps: {
      sx: {
        p: 2,
      },
    },
  },
  render: (args) => {
    return (
      <DataGroup {...args}>
        <DataBox label="Children" variant="text" value="This is a children" />
      </DataGroup>
    );
  },
};

export const WithList: Story = {
  args: {
    label: "List in Data Group",
    bodyProps: {
      sx: {
        p: 2,
      },
    },
  },
  render: (args) => {
    return (
      <DataGroup {...args}>
        <List disablePadding dense>
          <ListItem>One</ListItem>
          <ListItem>Two</ListItem>
          <ListItem>Three</ListItem>
        </List>
      </DataGroup>
    );
  },
};
