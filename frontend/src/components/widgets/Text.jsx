import { Typography } from "@mui/material";
import React from "react";

const Text = ({ variant, text, css }) => {
  return (
    <Typography variant={variant} sx={css}>
      {text}
    </Typography>
  );
};

export default Text;
