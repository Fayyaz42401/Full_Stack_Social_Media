import { Post } from "../models/Post.js";
import { User } from "../models/User.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const createPost = async (req, res, next) => {
  try {
    const { caption, postPicture } = req.body;
    if (!caption) return next(new ErrorHandler("write some caption"));

    const user = req.user;

    const post = await Post.create({
      userId: user._id,
      userName: user.name,
      userPicture: user.picture,
      caption,
      postPicture,
    });

    res.status(201).json({
      success: true,
      message: "Post Created",
      post,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) return next(new ErrorHandler("Invalid Id", 500));

    if (user._id.toString() !== post.userId.toString())
      return next(new ErrorHandler("You Cannot Delete This Post", 403));

    await Post.deleteOne(post);
    res.status(200).json({
      success: true,
      message: "Post Delete Successfully",
      post,
    });
  } catch (error) {
    console.log(error);
  }
};

export const allPost = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.log(error);
  }
};

export const manageLike = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const post = await Post.findById(id);
    if (!id || !post) return next(new ErrorHandler("Invalid Id", 500));

    const alreadyLike = post.likes.find((item) => {
      if (item.userId.toString() === user._id.toString()) return true;
    });

    if (alreadyLike) {
      post.likes = post.likes.filter(
        (item) => item.userId.toString() !== user._id.toString()
      );
    } else {
      post.likes.push({
        userId: user._id,
      });
    }

    await post.save();

    res.status(200).json({
      success: true,
      post,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    const user = req.user;
    const post = await Post.findById(id);

    if (!id || !post) return next(new ErrorHandler("Invalid Id", 404));
    if (!comment) return next(new ErrorHandler("Write Something!", 403));
    post.comments.push({
      userId: user._id.toString(),
      userName: user.name,
      userPicture: user.picture,
      comment,
    });

    res.json({ message: "Commeted", post });

    await post.save();
  } catch (error) {
    console.log(error);
  }
};
export const deleteComment = async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;
    const post = await Post.findById(postId);

    if (!postId || !commentId) return next(new ErrorHandler("Invalid Id", 500));

    post.comments = post.comments.filter(
      (item) => item._id.toString() !== commentId.toString()
    );

    await post.save();

    res.json({ success: true, message: "Comment Deleted  Successfully", post });
  } catch (error) {
    console.log(error);
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const { postId, commentId } = req.params;
    const { title } = req.body;
    const post = await Post.findById(postId);

    if (!postId || !commentId) return next(new ErrorHandler("Invalid Id", 500));

    const comment = post.comments.find((item) => {
      const findComment = item._id.toString() === commentId.toString();
      return findComment;
    });

    if (title) comment.title = title;

    await post.save();

    res.json({ success: true, message: "Comment Updated Successfully", post });
  } catch (error) {
    console.log(error);
  }
};
