import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import cors from "cors";
import bodyParser from "body-parser";
// Initilize App
const app = express();

app.use(cookieParser());
app.use(cors({
  origin:["https://full-stack-social-media-d6qr.vercel.app"],
  methods:["POST","GET","PATCH","DELETE","PUT"],
  credentials:true
}))


// Configration
dotenv.config({
  path: "./config/config.env",
});

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// Connect Database

const mongoURI = "mongodb+srv://fayyaz42401:<fayyaz42401>@cluster0.lbb8n.mongodb.net/<DbImUsing>?retryWrites=true&w=majority";

mongoose.connect(mongoURI, {
useNewUrlParser: true,
useUnifiedTopology: true,
});

// mongoose
//   .connect(process.env.MONGO_URI, { dbName: "facebook" })
//   .then(() => console.log("Database is connected successfully"))
//   .catch((error) => console.log(error.message));

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
