import { Box, Button, CardActions, CardContent, Card as MuiCard, Typography } from "@mui/material";
import { Meta, StoryObj } from "@storybook/nextjs";

const Card = MuiCard;

const meta: Meta<typeof Card> = {
  title: "MUI/Surfaces/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    sx: { maxWidth: 400 },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Default",
    sx: { p: 4 },
  },
};

export const Regular: Story = {
  render: (args) => {
    return (
      <Card {...args}>
        <CardContent>
          <Typography variant="h4">Card title</Typography>
          <Box>Body</Box>
        </CardContent>
        <CardActions>
          <Button size="small" variant="contained">
            Do something
          </Button>
        </CardActions>
      </Card>
    );
  },
};
