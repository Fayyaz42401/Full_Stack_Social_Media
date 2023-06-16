import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { USER_API } from "../utils/api";
import { Avatar, Box, Button, Stack, Tooltip, Typography } from "@mui/material";
import PostCard from "../components/widgets/PostCard";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import LeftBar from "../components/sidebar/LeftBar";
import Icon from "../components/widgets/Icon";
import EditPopover from "../components/widgets/EditPopover";

const ProfilePage = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [post, setPost] = useState([]);

  const [editShow, setEditShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, themeMode } = useSelector((state) => state.user);
  const fetchUser = async () => {
    const { data } = await axios.get(`${USER_API}/singleuser/${id}`, {
      withCredentials: true,
    });
    setData(data.user);
  };

  const matchUser = user._id === data._id;

  const userPost = async () => {
    const { data } = await axios.get(`${USER_API}/userpost/${id}`, {
      withCredentials: true,
    });
    setPost(data.posts);
  };

  useEffect(() => {
    fetchUser();
    userPost();
  }, [id, post]);

  return (
    <>
      <Box
        position={"sticky"}
        top={0}
        width={"100%"}
        height={"300px"}
        onMouseEnter={() => setEditShow(true)}
        onMouseLeave={() => setEditShow(false)}
        zIndex={100}
      >
        <img
          src={data.banner}
          alt={data.name}
          style={{ width: "100%", height: "100%" }}
        />
        <Avatar
          src={data.picture || "sd"}
          alt={data.name}
          sx={{
            position: "absolute",
            left: "50px  ",
            fontSize: "3rem",
            bottom: "-150px",
            width: "200px",
            height: "200px",
          }}
        />
      </Box>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        bgcolor={themeMode === "dark" ? "#222" : "#efefef"}
        mx={1}
        mt={{ xs: 20, sm: 2 }}
        width={{ xs: "97%", sm: "calc(100% - 265px)" }}
        borderRadius={4}
        padding={"20px"}
        justifyContent={"space-between"}
        sx={{ float: "right" }}
      >
        <Stack spacing={1}>
          <Typography variant="h4">{data.name}</Typography>
          <Typography
            color={"gray"}
            variant="subtitle2"
          >{`${data.friends?.length} friends`}</Typography>
        </Stack>
        {matchUser ? <EditPopover /> : ""}
      </Stack>
      <Stack
        height={"auto"}
        display={"flex"}
        px={{ xs: 1, sm: 4 }}
        direction={"row"}
        width={"100%"}
        spacing={{ xs: 0, sm: 2 }}
        paddingBottom={2}
      >
        <Box
          sx={{ alignSelf: "flex-start" }}
          position={"sticky"}
          display={{ xs: "none", md: "flex" }}
          top={"475px"}
          width={"500px"}
          height={"auto"}
        >
          <LeftBar user={data} />
        </Box>

        <Stack width={"100%"} pt={{ xs: 2, sm: 5 }}>
          {post
            ?.slice(0)
            .reverse()
            .map((item) => (
              <PostCard path={false} post={item} key={item._id} />
            ))}
        </Stack>
      </Stack>
    </>
  );
};

export default ProfilePage;
