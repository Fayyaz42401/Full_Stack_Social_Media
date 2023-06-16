import {
  Avatar,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Divider,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Icon from "../widgets/Icon";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/actions/userAction";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { themeHandler } from "../../store/slices/userSlice";

const Header = ({ user }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const { themeMode } = useSelector((state) => state.user);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  const changeTheme = () => {
    dispatch(themeHandler());
  };

  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      width={"100%"}
      alignItems={"center"}
      px={2}
      py={1}
      position={"sticky"}
      top={0}
      zIndex={10}
      bgcolor={themeMode === "light" ? "#efefef" : "#222"}
    >
      <Link className="logo">Social</Link>

      <TextField
        sx={{
          display: { xs: "none", sm: "block" },
          width: "800px",
          borderRadius: "50px",
          "& fieldset": { border: "none" },
          margin: "0 10px",
        }}
        placeholder="Search User..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon title={"Search"} Icon={<SearchIcon />} />
            </InputAdornment>
          ),
        }}
        variant="outlined"
      />

      <Stack direction={"row"} spacing={2} alignItems={"center"}>
        <Icon title={"Messages"} Icon={<MessageIcon />} />
        <Icon title={"Notifications"} Icon={<NotificationsIcon />} />
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          aria-label="settings"
        >
          <Avatar
            src={user.picture || "asd"}
            alt={user.name}
            sx={{ background: "#5fc65f", width: "40px", height: "40px" }}
          />
        </IconButton>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          sx={{ display: "flex", flexDirection: "column" }}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem>
            <SettingsIcon />
            <p style={{ marginLeft: "10px" }}>Profile Settings</p>
          </MenuItem>
          <Divider />
          <MenuItem>
            <p style={{ marginRight: "10px" }}>Dark Theme</p>
            <Switch
              color="success"
              onClick={changeTheme}
              checked={themeMode === "dark"}
            />
          </MenuItem>
          <Divider />
          <MenuItem onClick={logoutHandler}>
            <LogoutIcon />
            <p style={{ marginLeft: "10px" }}>Logout</p>
          </MenuItem>
        </Menu>
      </Stack>
    </Stack>
  );
};

export default Header;
