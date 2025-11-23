import { Button, SnackbarCloseReason } from "@mui/material";
import { Meta, StoryObj } from "@storybook/nextjs";
import { SyntheticEvent, useState } from "react";
import Snackbar from ".";

const meta: Meta<typeof Snackbar> = {
  title: "Shared/Snackbar",
  component: Snackbar,
  tags: ["autodocs"],
  render: function SnackbarRender(args) {
    const [open, setOpen] = useState(false);

    const handleClose = (_: SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
      if (reason === "clickaway") {
        return;
      }

      setOpen(false);
    };

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Snackbar</Button>
        <Snackbar autoHideDuration={5000} {...args} open={open} onClose={handleClose} />
      </>
    );
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: "Default Snackbar",
    autoHideDuration: null,
  },
};

export const Success: Story = {
  args: {
    message: "Success Snackbar",
    variant: "success",
  },
};

export const Error: Story = {
  args: {
    message: "Error Snackbar",
    variant: "error",
  },
};

export const Warning: Story = {
  args: {
    message: "Warning Snackbar",
    variant: "warning",
  },
};

export const Info: Story = {
  args: {
    message: "Info Snackbar",
    variant: "info",
  },
};
