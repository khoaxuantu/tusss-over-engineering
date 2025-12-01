import { Meta, StoryObj } from "@storybook/nextjs";
import SwitchField from ".";

/**
 * A custom checkbox field which wraps around the MUI's `FomControlLabel` and `Switch`
 */
const meta: Meta<typeof SwitchField> = {
  title: "Shared/Form/Inputs/SwitchField",
  component: SwitchField,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof SwitchField>;

export const Default: Story = {
  args: {
    label: "Default Label",
  },
};

export const Checked: Story = {
  args: {
    label: "Checked Label",
    checked: true,
  },
};

export const Required: Story = {
  args: {
    label: "Required Label",
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Label",
    disabled: true,
  },
};
