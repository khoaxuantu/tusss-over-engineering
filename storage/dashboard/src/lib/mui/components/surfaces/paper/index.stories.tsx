import { Paper } from "@mui/material";
import { Meta, StoryObj } from "@storybook/nextjs";

const meta: Meta<typeof Paper> = {
  title: "MUI/Surfaces/Paper",
  component: Paper,
  tags: ["autodocs"],
  render: (args) => (
    <Paper {...args} sx={{ p: 4, ...args.sx }}>
      Inside a paper
    </Paper>
  ),
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const PaperLowest: Story = {
  args: {
    variant: "lowest",
  },
};

export const PaperLow: Story = {
  args: {
    variant: "low",
  },
};

export const PaperMedium: Story = {
  args: {
    variant: "medium",
  },
};

export const PaperHigh: Story = {
  args: {
    variant: "high",
  },
};

export const PaperHighest: Story = {
  args: {
    variant: "highest",
  },
};

export const PaperOutline: Story = {
  args: {
    variant: "outlined",
    sx: {
      backgroundColor: "var(--mui-palette-surface-medium)",
    },
  },
};
