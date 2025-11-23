import { Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import NavbarAvatar from "./avatar";

export default function Navbar() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="h6" sx={{ flexGrow: 1 }}>
          💩 Tusss Storage Admin
        </Typography>
        <NavbarAvatar />
      </Toolbar>
    </AppBar>
  );
}
