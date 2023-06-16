import express from "express";
import {
  allPost,
  createPost,
  deletePost,
  addComment,
  manageLike,
  deleteComment,
  updateComment,
} from "../controllers/post.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
const route = express.Router();

route.post("/create", isAuthenticated, createPost);
route.delete("/delete/:id", isAuthenticated, deletePost);
route.put("/managelike/:id", isAuthenticated, manageLike);
route.put("/addcomment/:id", isAuthenticated, addComment);
route.delete(
  "/deletecomment/:postId/:commentId",
  isAuthenticated,
  deleteComment
);
route.put("/updatecomment/:postId/:commentId", isAuthenticated, updateComment);
route.get("/allpost", allPost);

export default route;
