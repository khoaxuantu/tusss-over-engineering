import { Button } from "@mui/material";
import { Meta, StoryObj } from "@storybook/nextjs";
import { useToast } from "./hooks";
import { ToastProvider } from "./provider";

const meta: Meta<typeof ToastProvider> = {
  title: "Shared/Toast",
  component: ToastProvider,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
  render: function Render() {
    const toast = useToast();

    return (
      <>
        <Button onClick={() => toast({ title: "Default", description: "It should be info toast" })}>
          Open Default
        </Button>
        <Button
          onClick={() =>
            toast({
              title: "Success",
              description: "It should be success toast",
              variant: "success",
              setting: {
                autoHideDuration: 1000,
              },
            })
          }
        >
          Open Success
        </Button>
        <Button
          onClick={() =>
            toast({ title: "Error", description: "It should be error toast", variant: "error" })
          }
        >
          Open Error
        </Button>
        <Button
          onClick={() =>
            toast({
              title: "Warning",
              description: "It should be warning toast",
              variant: "warning",
            })
          }
        >
          Open Warning
        </Button>
        <Button
          onClick={() =>
            toast({ title: "Info", description: "It should be info toast", variant: "info" })
          }
        >
          Open Info
        </Button>
      </>
    );
  },
};
