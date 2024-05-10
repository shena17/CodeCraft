import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Notification from "../DispayComponents/Notification";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import logo from "../../images/logo.png";
import logoIcon from "../../images/icon.png";
import "../../styles/dashboard.css";
import HomeIcon from "@mui/icons-material/Home";
import PaidIcon from "@mui/icons-material/Paid";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";
import Home from "./Home";
import Forums from "./Forums";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Tags from "./Tag";
import Resource from "./Resource";
import Tutorial from "./Tutorial";
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import BookIcon from '@mui/icons-material/Book';
import AnimationIcon from '@mui/icons-material/Animation';

//Navigation
const nav = [
  { name: "Dashboard", icon: <HomeIcon />, path: "/admin/home" },
  { name: "Manage Users", icon: <PeopleIcon />, path: "/admin/members" },
  { name: "Manage Tags", icon: <EmojiPeopleIcon />, path: "/admin/tags" },
  { name: "Manage Resource", icon: <AutoAwesomeMotionIcon />, path: "/admin/resources" },
  { name: "Manage Tutorial", icon: <BookIcon />, path: "/admin/tutorials" },
  { name: "Community Forum", icon: <AnimationIcon />, path: "/admin/forums" },


];

const drawerWidth = 220;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  backgroundColor: "var(--drawer-bg)",
  paddingLeft: "5px",
  border: 0,
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  "-ms-overflow-style": "none",
  "scrollbar-width": "none",
  width: `calc(${theme.spacing(7)} + 0px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 0px)`,
  },
  backgroundColor: "var(--drawer-bg)",
  paddingLeft: "5px",
  border: 0,
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  color: "black",
  backgroundColor: "white",
  paddingLeft: "4rem",
  zIndex: 15,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    backgroundColor: "white",
    marginLeft: drawerWidth,
    paddingLeft: "0px",
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Dashboard() {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [openPopup, setOpenPopup] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [windowName, setWindowName] = useState("Dashboard");

  const setWindow = (name) => {
    sessionStorage.setItem("window", name);
    setWindowName(name);
  };

  useEffect(() => {
    setWindowName(sessionStorage.getItem("window"));
    if (sessionStorage.getItem("deleted")) {
      setNotify({
        isOpen: true,
        message: "Member deleted",
        type: "success",
      });
      sessionStorage.removeItem("deleted");
    }
  });

  return (
    <>
      {/* NOTIFICATION START*/}
      <Notification notify={notify} setNotify={setNotify} />
      {/* NOTIFICATION END*/}

      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <AppBar
          position="fixed"
          open={open}
          style={{
            boxShadow: "none",
            backgroundColor: "var(--dashboard-bg)",
          }}
        >
          <Toolbar
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="topBarLeft">
              <Tooltip title={open ? "Collapse" : "Expand"}>
                <IconButton
                  color="black"
                  aria-label="open drawer"
                  onClick={open ? handleDrawerClose : handleDrawerOpen}
                  edge="start"
                >
                  <MenuIcon />
                </IconButton>
              </Tooltip>
              <p className="pageName">{windowName}</p>
            </div>
            <div className={open ? "hideIcons" : "showIcons"}>
              <Button
                onClick={() => {
                  setOpenPopup(true);
                }}
                variant="contained"
                style={{
                  borderRadius: "10px",
                  color: "white",
                  backgroundColor: "var(--light-blue)",
                  border: "1px solid var(--light-blue) ",
                }}
              >
                <p>Register</p>
              </Button>
              <Button
                variant="contained"
                style={{
                  borderRadius: "10px",
                  color: "red",
                  backgroundColor: "var(--dashboard-bg)",
                  border: "1px solid red ",
                }}
                sx={{ marginLeft: "15px" }}
              >
                <p>Logout</p>
              </Button>
            </div>
          </Toolbar>
          <Divider
            variant="middle"
            sx={{
              height: "1.2px",
              backgroundColor: "var(--gray-dark)",
              marginBottom: "10px",
            }}
          />
        </AppBar>

        <Drawer variant="permanent" open={open}>
          <DrawerHeader sx={{ margin: "10px 0px" }}>
            <img src={open ? logo : logoIcon} alt="Logo" className="logo" />
          </DrawerHeader>
          <Divider
            variant="middle"
            sx={{
              height: "1.2px",
              backgroundColor: "var(--gray-dark)",
              marginBottom: "10px",
            }}
          />
          <List>
            {nav.map((item, index) => (
              <ListItem
                key={item.name}
                disablePadding
                sx={{
                  display: "block",
                  padding: "5px 0px",
                }}
                onClick={() => {
                  setWindow(item.name);
                }}
              >
                <NavLink
                  to={item.path}
                  key={item._id}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Tooltip title={!open && item.name}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 2 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>

                      <ListItemText
                        primary={item.name}
                        sx={{
                          opacity: open ? 1 : 0,
                          fontWeight: "800",
                          color: "var(--gray)",
                        }}
                      />
                    </ListItemButton>
                  </Tooltip>
                </NavLink>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexWrap: "wrap",
            justifyContent: "flex-start",
            flexGrow: 1,
            p: 3,
            backgroundColor: "var(--dashboard-bg)",
            minHeight: "100vh",
            paddingTop: "15px",
            overflowX: "hidden",
          }}
        >
          <DrawerHeader />

          <Routes>
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/tags" element={<Tags />} />
            <Route exact path="/resources" element={<Resource />} />
            <Route exact path="/tutorials" element={<Tutorial />} />
            <Route exact path="/forums" element={<Forums />} />


          </Routes>
        </Box>
      </Box>
    </>
  );
}
