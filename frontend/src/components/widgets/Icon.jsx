import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Icon = ({ Icon, handler, path = "", title, css }) => {
  return (
    <Link to={path} onClick={handler}>
      <Tooltip title={title}>
        <IconButton inputMode="" sx={css} size="small">
          {Icon}
        </IconButton>
      </Tooltip>
    </Link>
  );
};

export default Icon;
