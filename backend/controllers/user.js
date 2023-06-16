import { User } from "../models/User.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import bcrypt from "bcrypt";
import { setCookie } from "../utils/setCookie.js";
import { Post } from "../models/Post.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password, picture } = req.body;
    if (!name || !email || !password)
      return next(new ErrorHandler("Please Filled Input Fields"));
    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("Email Already Register"));

    const hashPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashPassword,
      picture,
    });

    setCookie(res, user, "Register Successfully", 201);
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return next(new ErrorHandler("Please Filled Input Fields"));
    let user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Invalid Email"));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new ErrorHandler("Incorrect Password"));

    setCookie(res, user, "Login Successfully", 200);
  } catch (error) {
    console.log(error);
  }
};
export const allUser = async (req, res, next) => {
  try {
    let users = await User.find({});
    const user = req.user;
    users = users.filter((item) => item._id.toString() !== user._id.toString());
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
      })
      .json({
        success: true,
        message: "Logout Successfully",
        user: req.user,
      });
  } catch (error) {
    console.log(error.message);
  }
};

export const myProfile = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name, email, about, picture, banner, facebook, twitter, linkedin } =
      req.body;
    const user = req.user;

    if (user.email === email) {
      if (name) user.name = name;
      if (email) user.email = email;
      if (about) user.about = about;
      if (picture) user.picture = picture;
      if (banner) user.banner = banner;
      if (facebook) user.facebook = facebook;
      if (twitter) user.twitter = twitter;
      if (linkedin) user.linkedin = linkedin;
    } else {
      const findUser = await User.findOne({ email });
      console.log(findUser);
      if (findUser) return next(new ErrorHandler("This Email Is Already Used"));
      if (name) user.name = name;
      if (email) user.email = email;
      if (about) user.about = about;
      if (picture) user.picture = picture;
      if (banner) user.banner = banner;
      if (facebook) user.facebook = facebook;
      if (twitter) user.twitter = twitter;
      if (linkedin) user.linkedin = linkedin;
    }

    const post = await Post.updateMany(
      { userId: user._id },
      {
        $set: {
          userName: name,
          userPicture: picture,
        },
      }
    );

    await user.save();
    res.status(200).json({
      success: true,
      message: "Profile Update Successfuly",
      user,
      post,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    let user = await User.findById(req.user._id).select("+password");

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return next(new ErrorHandler("Old Password Is Incorrect"));

    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Updated Successfuly",
      user,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getUserFriends = async (req, res, next) => {
  try {
    const user = req.user;

    const friends = user.friends;

    res.status(200).json({
      success: true,
      friends,
    });
  } catch (error) {
    next(error.message);
  }
};

export const addFriend = async (req, res, next) => {
  try {
    const { friendId } = req.params;
    const user = req.user;
    const friend = await User.findById(friendId);

    const alreadyAdd = user.friends.find((item) => {
      if (item.userId === friendId) return true;
    });

    if (alreadyAdd) {
      user.friends = user.friends.filter((item) => item.userId !== friendId);
      friend.friends = friend.friends.filter(
        (item) => item.userId !== user._id.toString()
      );
    } else {
      user.friends.push({ userId: friendId });
      friend.friends.push({ userId: user._id.toString() });
    }

    await user.save();
    await friend.save();

    res.status(200).json({ success: "true", friend, user });
  } catch (error) {
    console.log(error);
  }
};

export const userPost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const posts = await Post.find({ userId: id });
    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.log(error);
  }
};

export const singleUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return next(new ErrorHandler("Invalid Id", 404));

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};
