import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Avatar from "@mui/material/Avatar";
import { useState, useEffect, createContext } from "react";
import { useTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import { actionCreators } from "./State/index";
import PostForm from "./PostForm";
import { gettingUserInfo, DrawerHeader, AppBar, Drawer } from "./Functions";
import SideBar from "./SideBar";
import SearchBar from "./SearchBar";
import LoadingGif from "../Componenets/Images/giphy.gif";

const User = createContext();

export default function MiniDrawer() {

  const navigate = useNavigate();

  //// From Material UI
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  //// From Material UI

  const theme = useTheme();

  const [userInfo, setUserInfo] = useState({});

  const dispatch = useDispatch();
  const { userPOP } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    gettingUserInfo(setUserInfo);
  }, []);

  return (
    <User.Provider value={userInfo}>
      <Box sx={{ display: "flex" }}>
        {userInfo === undefined && (
          <div className="loadingGif">
            <img src={LoadingGif} alt="loading" />
          </div>
        )}
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              F R I E N D S
            </Typography>
            <Avatar
              alt="Trevor Henderson"
              style={{ left: "80%", height: "50px", width: "50px" }}
              src={userInfo.userPhoto}
              onClick={() => navigate("/user")}
            />
            <SearchBar />
            <Avatar
              alt="Trevor Henderson"
              style={{ left: "80%" }}
              src={userInfo.userPhoto}
              onClick={userPOP}
            />
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <SideBar />
          <Divider />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <PostForm />
        </Box>
      </Box>
    </User.Provider>
  );
}

export { User };
