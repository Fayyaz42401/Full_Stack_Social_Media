import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import cors from "cors";
import bodyParser from "body-parser";
// Initilize App
const app = express();

// Configration
dotenv.config({
  path: "./config/config.env",
});

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(
  cors({
      origin:"https://fayyaz-social-media.vercel.app",
    credentials: true,
  })
);

// Connect Database
mongoose
  .connect(process.env.MONGO_URI, { dbName: "facebook" })
  .then(() => console.log("Database is connected successfully"))
  .catch((error) => console.log(error.message));

app.listen(5000, () => {
  console.log(`Server is working on port:${process.env.PORT}`);
});

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "working",
  });
});
app.get("/status", (req, res) => {
  res.json({
    success: true,
    message: "working Fine Fayyaz",
  });
});

import userRoute from "./routes/user.js";
import postRoute from "./routes/post.js";

app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
// Error Middleware
app.use(errorMiddleware);
