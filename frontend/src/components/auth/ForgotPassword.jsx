import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import Heading from "../widgets/Heading";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/actions/userAction";
const ForgotPassword = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = () => {
    const formData = { email, password };
    dispatch(loginUser(formData, navigate));
    navigate("/home");
  };

  return (
    <Box
      display={"flex"}
      minHeight={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Paper
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "300px",
          width: "500px",
        }}
      >
        <Stack spacing={2} p={5}>
          <Heading css={{ textAlign: "center" }} title={"Forgot Password"} />

          <TextField
            variant="filled"
            type="email"
            label={"Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Link
            style={{ alignSelf: "end", textDecoration: "underline" }}
            to={"/login"}
          >
            <small>I remember? Login</small>
          </Link>

          <Link style={{ width: "100%" }}>
            <Button onClick={submitHandler} sx={{ color: "#fff" }} fullWidth>
              Find Email
            </Button>
          </Link>
        </Stack>
      </Paper>
    </Box>
  );
};

export default ForgotPassword;
