// import { query } from "express";
import mongoose from "mongoose";
import Bookmark from "../models/Bookmark";
import Post from "../models/Post";
import User from "../models/User";

// * Get All Post
export const getAllPosts = async (req, res) => {
  let post;

  try {
    const { page = 1, limit = 10 } = req.query;
    post = await Post.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ _id: -1 });
  } catch (error) {
    console.log(error);
  }

  if (!post) {
    return res.status(404).json({ message: "No Posts Found" });
  }

  return res.status(200).json({ post: post });
};

// * Upload A Post

export const uploadPost = async (req, res, next) => {
  let post;

  let existingUser;

  try {
    existingUser = await User.findById(req.body.userDetail);
  } catch (error) {
    console.log(error);
  }

  if (!existingUser) {
    return res.status(404).json({ message: "User Not Found!" });
  }

  try {
    post = new Post({
      avatar: req.body.avatar,
      location: req.body.location,
      username: req.body.username,
      image: req.body.image,
      postText: req.body.postText,
      comments: req.body.comments,
      likes: req.body.likes,
      userDetail: req.body.userDetail,
      userInfoName: req.body.userInfoName,
    });

    const session = await mongoose.startSession();
    session.startTransaction();
    await post.save({ session });
    existingUser.posts.push(post);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (error) {
    console.log(error);
  }

  if (!post) {
    return res.status(404).json({ message: "Couldnt add Blog Post!" });
  }
  return res.status(200).json({ post: post });
};

// * Update A Post

export const updatePost = async (req, res, next) => {
  const postId = req.params.id;
  let post;

  try {
    post = await Post.findByIdAndUpdate(postId, {
      postText: req.body.postText,
      location: req.body.location,
      image: req.body.image,
      avatar: req.body.avatar,
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to find this post" });
  }

  if (!post) {
    return res.status(404).json({ message: "Cant Update this post!" });
  }

  return res.status(200).json({ message: "Successfully Updated this post" });
};

// * Like A Post

export const likePost = async (req, res, next) => {
  const postId = req.body.pId;
  let post;

  var userdet = {
    name: req.body.name,
    avatar: req.body.avatar,
    userId: req.body.userId,
  };

  try {
    post = await Post.findByIdAndUpdate(postId, {
      $push: { likes: userdet },
    });
  } catch (error) {
    console.log(error);
  }

  if (!post) {
    return res.status(404).json({ message: "Can't Like this Post!" });
  }

  return res.status(200).json({ message: "Successfully Liked Post!" });
};

//* Comment on a Post

export const commentOnPost = async (req, res) => {
  const postId = req.body.pId;
  let post;

  var userdet = {
    name: req.body.name,
    avatar: req.body.avatar,
    userId: req.body.userId,
    commentText: req.body.commentText,
  };

  try {
    post = await Post.findByIdAndUpdate(postId, {
      $push: { comments: userdet },
    });
  } catch (error) {
    console.log(error);
  }

  if (!post) {
    return res.status(404).json({ message: "Can't Comment On this Post!" });
  }

  return res.status(200).json({ message: "Successfully Commented On Post!" });
};

// * Get Singular Post

export const getPostById = async (req, res, next) => {
  const postId = req.params.id;
  let post;

  try {
    post = await Post.findById(postId);
  } catch (error) {
    return res.status(404).json({ message: "Unable to find this blog" });
  }

  if (!post) {
    return res.status(404).json({ message: "Cant get this!" });
  }

  return res.status(200).json({ post });
};

// * Delete A Post

export const deletePost = async (req, res, next) => {
  const postId = req.params.id;
  let post;

  try {
    post = await Post.findByIdAndRemove(postId).populate("userDetail");
    await post.userDetail.posts.pull(post);
    await post.userDetail.save();
  } catch (error) {
    console.log(error);
  }

  if (!post) {
    return res.status(500).json({ message: "Unable To Delete" });
  }

  return res.status(200).json({ message: "Successfully Deleted" });
};

//* Dislike A Post

export const dislikePost = async (req, res, next) => {
  const userId = req.body.userId;
  const postId = req.body.postId;
  let like;

  try {
    like = await Post.findByIdAndUpdate(
      postId,
      { $pull: { likes: { userId: userId } } },
      { multi: true }
    );
  } catch (error) {
    console.log(error);
  }

  if (!like) {
    return res.status(500).json({ message: "Unable To Dislike" });
  }

  return res.status(200).json({ message: "Successfully Disliked fr" });
};

export const findUserPosts = async (req, res) => {
  const userId = req.params.id;
  let posts;

  try {
    posts = await Post.find({ userInfoName: userId });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Unable to find this User's Posts" });
  }

  if (!posts) {
    return res.status(404).json({ message: "Invalid Data!" });
  }

  return res.status(200).json({ posts });
};
