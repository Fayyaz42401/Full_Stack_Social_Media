import React, { useEffect } from "react";
import Heading from "../widgets/Heading";
import {
  Avatar,
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import VideocamIcon from "@mui/icons-material/Videocam";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import PostCard from "../widgets/PostCard";
import { useSelector, useDispatch } from "react-redux";
import { allPost, createPost } from "../../store/actions/postAction";
import { useState } from "react";
import axios from "axios";
import { POST_API } from "../../utils/api";
import { Link } from "react-router-dom";
import Loader from "../widgets/Loader";
const Feed = ({ user }) => {
  const dispatch = useDispatch();
  const [caption, setCaption] = useState("");
  const [postPicture, setPostPicture] = useState("");
  const [loading, setLoading] = useState(false);
  const { isLoading } = useSelector((state) => state.post);
  const [data, setData] = useState([]);
  useEffect(() => {
    const AllPOST = async () => {
      const { data } = await axios.get(`${POST_API}/allpost`);
      setData(data.posts);
    };
    AllPOST();
  }, [data]);

  const postHandler = (e) => {
    const form = { caption, postPicture };
    if (e.key === "Enter" || e.which === 13) {
      dispatch(createPost(form));
      setCaption("");
      setPostPicture("");
    }
  };

  const imageHandler = (file) => {
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
        setPostPicture(data.url.toString());
        console.log(data.url.toString());
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div style={{ width: "100%", margin: "0" }}>
      <Paper elevation={2} sx={{ padding: "20px" }}>
        <Stack direction={"row"} spacing={2}>
          <Link to={`profile/${user._id}`}>
            <Avatar src={user.picture || "ASd"} alt={user.name} />
          </Link>
          <TextField
            sx={{
              borderRadius: "50px",
              "& fieldset": { border: "none" },
              width: "100%",
            }}
            placeholder={`What on your mind? ${user.name}`}
            variant="outlined"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            onKeyUp={postHandler}
          />
        </Stack>
        <Divider sx={{ marginTop: "20px" }} />
        <Stack direction={"row"} mt={1}>
          <Button
            fullWidth
            startIcon={<ImageIcon />}
            color="inherit"
            variant="text"
            component="label"
            disabled={loading}
          >
            <input
              onChange={(e) => imageHandler(e.target.files[0])}
              type="file"
              hidden
            />
            Image
          </Button>

          <Btn title={"Live"} icon={<VideocamIcon />} />
          <Btn title={"Feelings"} icon={<EmojiEmotionsIcon />} />
        </Stack>
      </Paper>
      {isLoading ? (
        <Loader />
      ) : (
        data
          ?.slice(0)
          .reverse()
          .map((item) => <PostCard post={item} key={item._id} />)
      )}
    </div>
  );
};

export default Feed;

const Btn = ({ title, icon }) => {
  return (
    <Tooltip title={title}>
      <Button startIcon={icon} fullWidth variant="text" color="inherit">
        {title}
      </Button>
    </Tooltip>
  );
};
