import { BoxCenter } from "@lib/shared/components/boxes/center";
import { Paper, Typography } from "@mui/material";

export default async function Login() {
  return (
    <BoxCenter>
      <Paper sx={{ px: 2, textAlign: "center" }}>
        <h3>💩 Tusss Storage Admin</h3>

        <Typography component="h2" variant="h2">
          <mark>Sign in to your account</mark>
        </Typography>
      </Paper>
    </BoxCenter>
  );
}
