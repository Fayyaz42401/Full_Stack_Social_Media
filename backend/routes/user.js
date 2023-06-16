import express from "express";
import {
  addFriend,
  getUserFriends,
  login,
  logout,
  myProfile,
  register,
  updatePassword,
  updateProfile,
  userPost,
  allUser,
  singleUser,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const route = express.Router();

route.post("/register", register);
route.post("/login", login);
route.get("/alluser", isAuthenticated, allUser);
route.get("/logout", isAuthenticated, logout);
route.get("/me", isAuthenticated, myProfile);
route.get("/singleuser/:id", isAuthenticated, singleUser);
route.put("/updateprofile", isAuthenticated, updateProfile);
route.put("/updatepassword", isAuthenticated, updatePassword);
route.get("/getuserfriends", isAuthenticated, getUserFriends);
route.patch("/add/:friendId", isAuthenticated, addFriend);
route.get("/userpost/:id", isAuthenticated, userPost);

export default route;
