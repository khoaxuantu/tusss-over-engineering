import { Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Link from "../links";
import NavbarAvatar from "./avatar";
import DrawerSidebar from "./drawer-sidebar";
import ElevationScroll from "./elevation-scroll";

export default function Navbar() {
  return (
    <ElevationScroll>
      <AppBar component="nav" position="sticky">
        <Toolbar>
          <DrawerSidebar />
          <Typography variant="h6" component="h6" sx={{ flexGrow: 1 }}>
            <Link href="/" sx={{ textDecoration: "none" }}>
              <mark>Potonow Admin</mark>
            </Link>
          </Typography>
          <NavbarAvatar />
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
}
