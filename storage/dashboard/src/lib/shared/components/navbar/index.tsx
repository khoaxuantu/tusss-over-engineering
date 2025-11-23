import { Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Link from "../links";
import NavbarAvatar from "./avatar";

export default function Navbar() {
  return (
    <AppBar component="nav" position="sticky">
      <Toolbar>
        <Typography variant="h6" component="h6" sx={{ flexGrow: 1 }}>
          <Link href="/" sx={{ textDecoration: "none" }}>
            <mark>💩 Tusss Storage Admin</mark>
          </Link>
        </Typography>
        <NavbarAvatar />
      </Toolbar>
    </AppBar>
  );
}
