import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Heading from "./Heading";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  addComment,
  allPost,
  deletePost,
  manageLike,
} from "../../store/actions/postAction";
import SendIcon from "@mui/icons-material/Send";
import Icon from "../widgets/Icon";
import axios from "axios";
import { POST_API } from "../../utils/api";
import { toast } from "react-toastify";
const PostCard = ({ post, path = true }) => {
  const { user } = useSelector((state) => state.user);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const isLiked = post.likes.find((i) => {
    if (i.userId === user._id) {
      return true;
    } else {
      return false;
    }
  });

  const likeHandler = () => {
    dispatch(manageLike(post._id));
    dispatch(allPost());
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const deletePostHandler = () => {
    dispatch(deletePost(post._id));
  };

  const postComment = async () => {
    try {
      const { data } = await axios.put(
        `${POST_API}/addcomment/${post._id}`,
        { comment },
        { withCredentials: true }
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const commentHandler = () => {
    postComment();
    setComment("");
  };

  const commentDeleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `${POST_API}/deletecomment/${post._id}/${id}`,
        { withCredentials: true }
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Card sx={{ width: "100%", marginTop: "10px" }}>
      <CardHeader
        avatar={
          <Link to={path ? `profile/${post.userId}` : ""}>
            <Avatar src={post.userPicture || "asd"} alt={post.userName} />
          </Link>
        }
        action={
          <>
            <IconButton
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              aria-label="settings"
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={deletePostHandler}>Delete Post</MenuItem>
            </Menu>
          </>
        }
        title={post.userName}
        subheader={moment(post.createdAt).startOf("second").fromNow()}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.caption}
        </Typography>
      </CardContent>

      <CardMedia
        component="img"
        sx={{ maxHeight: "500px" }}
        image={post.postPicture || ""}
      />

      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{ padding: "10px" }}
      >
        <Typography>
          {isLiked
            ? `you and  ${post.likes.length - 1} others `
            : `${post.likes.length} Likes `}
        </Typography>
        <Typography>{post.comments.length} comments</Typography>
      </Stack>
      <Divider />
      <CardActions>
        <Btn
          handler={likeHandler}
          title={"Like"}
          icon={isLiked ? <ThumbUpAltIcon /> : <ThumbUpOutlinedIcon />}
          color={isLiked ? "info" : "inherit"}
        />

        <Btn
          title={"Comment"}
          icon={<CommentOutlinedIcon />}
          handler={() => setShowComments(!showComments)}
        />
        <Btn title={"Share"} icon={<ShareIcon />} />
      </CardActions>

      {showComments ? (
        <Paper
          variant="outlined"
          sx={{ margin: "10px", padding: "10px 20px", maxHeight: "400px" }}
        >
          <Heading title={"Comments"} />
          <Stack width={"100%"} direction={"row"} spacing={2}>
            <Avatar src={user.picture || "sad"} alt={user.name} />
            <TextField
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              sx={{
                borderRadius: "50px",
                "& fieldset": { border: "none" },
                width: "100%",
              }}
              placeholder="Write a comment"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Icon
                      Icon={<SendIcon />}
                      title={"send"}
                      handler={commentHandler}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <Divider sx={{ marginTop: "10px" }} />
          <Box className="commentBox">
            {post.comments
              ?.slice(0)
              .reverse()
              .map((item) => {
                return (
                  <Stack key={item._id} direction={"row"} spacing={2} mt={2}>
                    <Avatar
                      src={item.userPicture || "Asd"}
                      alt={item.userName}
                    />
                    <Paper sx={{ padding: "5px 10px" }}>
                      <Stack
                        alignItems={"center"}
                        direction={"row"}
                        justifyContent={"space-between"}
                      >
                        <Typography variant="body1">{item.userName}</Typography>
                        {item.userId === user._id ? (
                          <Button
                            onClick={() => commentDeleteHandler(item._id)}
                            variant="text"
                            size={"small"}
                          >
                            Delete
                          </Button>
                        ) : (
                          ""
                        )}
                      </Stack>
                      <Divider />

                      <Typography variant="caption">{item.comment}</Typography>
                    </Paper>
                  </Stack>
                );
              })}
          </Box>
        </Paper>
      ) : (
        ""
      )}
    </Card>
  );
};

export default PostCard;

const Btn = ({ title, icon, handler, color = "inherit" }) => {
  return (
    <Tooltip title={title}>
      <Button
        startIcon={icon}
        onClick={handler}
        fullWidth
        variant="text"
        color={color}
      >
        {title}
      </Button>
    </Tooltip>
  );
};
