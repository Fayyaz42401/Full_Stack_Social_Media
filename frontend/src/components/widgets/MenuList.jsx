import { Button, Menu, MenuItem } from "@mui/material";
import React from "react";

const MenuList = ({ menuOpen, handler }) => {
  return (
    <div>
      <Button onClick={handler}>clickme</Button>
      <Menu id="basic-menu" open={true} onClose={handler}>
        <MenuItem onClick={handler}>Profile</MenuItem>
        <MenuItem onClick={handler}>My account</MenuItem>
        <MenuItem onClick={handler}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default MenuList;
