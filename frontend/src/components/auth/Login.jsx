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
const Login = () => {
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
          height: "400px",
          width: "500px",
        }}
      >
        <Stack spacing={2} p={5}>
          <Heading css={{ textAlign: "center" }} title={"Login"} />

          <TextField
            variant="filled"
            type="email"
            label={"Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="filled"
            type={show ? "text" : "password"}
            label={"Password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShow(!show)}>
                    {show ? (
                      <VisibilityOutlinedIcon />
                    ) : (
                      <VisibilityOffOutlinedIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Link
            style={{ alignSelf: "end", textDecoration: "underline" }}
            to={"/forgotpassword"}
          >
            <small>Forgot Password </small>
          </Link>

          <Link style={{ width: "100%" }}>
            <Button onClick={submitHandler} sx={{ color: "#fff" }} fullWidth>
              Login
            </Button>
          </Link>

          <Link style={{ textAlign: "center" }} to={"/register"}>
            <small>Don't have an account? Register</small>
          </Link>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Login;
