import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Input,
  InputAdornment,
  OutlinedInput,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import Heading from "../widgets/Heading";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/actions/userAction";
import LoadingButton from "@mui/lab/LoadingButton";

const Register = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState();
  const [imagePrev, setImagePrev] = useState();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const submitHander = () => {
    const formData = { name, email, password, picture: image };
    dispatch(registerUser(formData));
  };

  const fetchImage = (file) => {
    setLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "social-media");
    data.append("cloud_name", "da0uyjsjb");
    fetch(`https://api.cloudinary.com/v1_1/da0uyjsjb/image/upload`, {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setImage(data.url.toString());
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      setImagePrev(reader.result);
      setImage(file);
      fetchImage(file);
    };
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
          height: "600px",
          width: "500px",
        }}
      >
        <Stack spacing={2} p={5}>
          <Heading css={{ textAlign: "center" }} title={"Register"} />

          <Avatar
            src={imagePrev}
            sx={{ width: "80px", height: "80px", alignSelf: "center" }}
          />

          <TextField
            variant="filled"
            type="text"
            label={"Name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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

          <OutlinedInput
            type="file"
            accept={"image/*"}
            onChange={imageHandler}
          />

          <Link style={{ width: "100%" }}>
            <LoadingButton
              loading={loading}
              color="success"
              variant="contained"
              onClick={submitHander}
              sx={{ color: "#fff" }}
              fullWidth
            >
              Register
            </LoadingButton>
          </Link>
          <Link style={{ textAlign: "center" }} to={"/login"}>
            <small>Already An Account? Login </small>{" "}
          </Link>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Register;
