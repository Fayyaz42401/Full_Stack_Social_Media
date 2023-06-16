import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userPicture: {
      type: String,
      default: "",
    },

    caption: {
      type: String,
      required: true,
    },
    postPicture: {
      type: String,
      default: "",
    },

    likes: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    comments: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },

        userName: String,
        userPicture: String,
        comment: String,
      },
    ],
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", Schema);
