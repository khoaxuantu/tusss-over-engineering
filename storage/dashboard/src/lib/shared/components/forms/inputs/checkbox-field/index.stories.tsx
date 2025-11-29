import { Meta, StoryObj } from "@storybook/nextjs";
import CheckboxField from ".";

/**
 * A custom checkbox field which wraps around the MUI's `FomControlLabel` and `Checkbox`
 */
const meta: Meta<typeof CheckboxField> = {
  title: "Shared/Form/Inputs/CheckboxField",
  component: CheckboxField,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof CheckboxField>;

export const Default: Story = {
  args: {
    label: "Default Label",
  },
};

export const Checked: Story = {
  args: {
    label: "Checked Label",
    inputProps: {
      checked: true,
    },
  },
};

export const Required: Story = {
  args: {
    label: "Required Label",
    inputProps: {
      required: true,
    },
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Label",
    inputProps: {
      disabled: true,
    },
  },
};
