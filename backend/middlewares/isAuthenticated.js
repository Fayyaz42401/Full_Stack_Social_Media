import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/ErrorHandler.js";
import { User } from "../models/User.js";

export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return next(new ErrorHandler("Login First", 403));
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded._id);
  next();
};
