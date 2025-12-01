import LoginForm from "@lib/auth/components/forms/login";
import { LoginFormProvider } from "@lib/auth/providers/login/form";
import { BoxCenter } from "@lib/shared/components/boxes/center";
import { Box, Paper, Typography } from "@mui/material";

export default async function Login() {
  return (
    <BoxCenter>
      <Paper
        sx={{
          textAlign: "center",
          maxWidth: "360px",
          width: "100%",
          borderRadius: "var(--mui-shape-radius-4)",
          bgcolor: "primary.light",
        }}
      >
        <Box px={4} py={4}>
          <Typography component="h3" variant="h4" mb={2}>
            💩 Tusss Storage Admin
          </Typography>
          <Typography component="h2" variant="h3" mb={4}>
            <mark>Sign in to your account</mark>
          </Typography>
          <LoginFormProvider>
            <LoginForm />
          </LoginFormProvider>
        </Box>
      </Paper>
    </BoxCenter>
  );
}
