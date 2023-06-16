import mongoose, { Mongoose } from "mongoose";

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
      minLength: 6,
    },
    picture: {
      type: String,
      default: "",
    },
    banner: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmmpZUnsZHK1et0ijWgw2ZtH3LsK8QRJtkXQ&usqp=CAU",
    },

    about: {
      type: String,
      default: "This is defalut About Paragraph.You Can Edit Your About!",
    },
    facebook: {
      type: String,
      default: "https://www.facebook.com",
    },
    twitter: {
      type: String,
      default: "https://twitter.com",
    },
    linkedin: {
      type: String,
      default: "https://www.linkedin.com/feed",
    },

    friends: [
      {
        userId: String,
        userName: String,
        userPicture: String,
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", Schema);
