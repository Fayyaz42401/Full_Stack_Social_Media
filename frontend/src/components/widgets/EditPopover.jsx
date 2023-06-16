import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import { USER_API } from "../../utils/api";
import { toast } from "react-toastify";

export default function EditPopover() {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [about, setAbout] = useState(user.about);
  const [picture, setPicture] = useState(user.Picture);
  const [banner, setBanner] = useState(user.banner);
  const [facebook, setFacebook] = useState(user.facebook);
  const [twitter, setTwitter] = useState(user.twitter);
  const [linkedin, setLinkedin] = useState(user.linkedin);
  const [loading, setLoading] = useState(false);
  const bannerHandler = (file) => {
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
        setBanner(data.url.toString());
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const profileHandler = (file) => {
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
        setPicture(data.url.toString());
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const updateHandler = async () => {
    try {
      const form = {
        name,
        email,
        about,
        banner,
        picture,
        facebook,
        twitter,
        linkedin,
      };
      const { data } = await axios.put(`${USER_API}/updateprofile`, form, {
        withCredentials: true,
      });
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setOpen(false);
  };

  return (
    <div>
      <Button
        sx={{ color: "#fff", marginTop: "10px" }}
        onClick={handleClickOpen}
      >
        Edit Profile
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="Change Name"
              type="text"
              variant="filled"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Change Email"
              type="email"
              variant="filled"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Change About"
              multiline
              type="text"
              variant="filled"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
            <Typography> Edit Socials </Typography>
            <TextField
              label="Change Facebook"
              type="text"
              variant="filled"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
            />
            <TextField
              label="Change Twitter"
              type="text"
              variant="filled"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
            />
            <TextField
              label="Change LinkdIn"
              type="text"
              variant="filled"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />

            <Button
              onChange={(e) => profileHandler(e.target.files[0])}
              component="label"
              color="inherit"
            >
              <input type="file" hidden /> Change Profile
            </Button>
            <Button component="label" color="inherit">
              <input
                onChange={(e) => bannerHandler(e.target.files[0])}
                type="file"
                hidden
              />
              Change Banner
            </Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            disabled={loading}
            sx={{ color: "#fff" }}
            onClick={updateHandler}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
