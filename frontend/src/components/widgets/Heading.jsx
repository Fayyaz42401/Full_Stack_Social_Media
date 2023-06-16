import { Typography } from "@mui/material";
import React from "react";

const Heading = ({ title, css }) => {
  return (
    <Typography sx={{ margin: "10px 0", ...css }} variant="h4" fontWeight={800}>
      {title}
    </Typography>
  );
};

export default Heading;
