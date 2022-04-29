import * as react from "react";

import { Link } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GamesIcon from "@mui/icons-material/Games";
import AddIcon from "@mui/icons-material/Add";
import FaceIcon from "@mui/icons-material/Face";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { Box } from "@mui/system";
import { Drawer } from "@mui/material";

const drawerWidth = 240;

export default function MenuDrawer(props) {
  const { window, loggedIn } = props;
  const [mobileOpen, setMobileOpen] = react.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {[
          { text: "Home", icon: <HomeIcon />, path: "" },
          { text: "My Games", icon: <GamesIcon />, path: "/games" },
          { text: "New Game", icon: <AddIcon />, path: "/games/new" },
        ].map((obj) => (
          <Link to={obj.path} key={obj.text}>
            <ListItem button>
              <ListItemIcon>{obj.icon}</ListItemIcon>
              <ListItemText primary={obj.text} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {loggedIn
          ? [
              { text: "Profile", icon: <FaceIcon />, path: "/profile" },
              { text: "Logout", icon: <LogoutIcon />, path: "/logout" },
            ].map((obj) => (
              <Link to={obj.path} key={obj.text}>
                <ListItem button>
                  <ListItemIcon>{obj.icon}</ListItemIcon>
                  <ListItemText primary={obj.text} />
                </ListItem>
              </Link>
            ))
          : [
              { text: "Login", icon: <LoginIcon />, path: "/login" },
              { text: "Sign up", icon: <FaceIcon />, path: "/signup" },
            ].map((obj) => (
              <Link to={obj.path} key={obj.text}>
                <ListItem button key={obj.text}>
                  <ListItemIcon>{obj.icon}</ListItemIcon>
                  <ListItemText primary={obj.text} />
                </ListItem>
              </Link>
            ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="sidebar drawer"
    >
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
