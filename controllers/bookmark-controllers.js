import mongoose from "mongoose";
import Bookmark from "../models/Bookmark";

export const addBookmark = async (req, res, next) => {
  let bookmark;

  try {
    bookmark = new Bookmark({
      avatar: req.body.avatar,
      location: req.body.location,
      username: req.body.username,
      image: req.body.image,
      postText: req.body.postText,
      comments: req.body.comments,
      likes: req.body.likes,
      userDetail: req.body.userDetail,
      postId: req.body.postId,
      saved: true,
    });

    await bookmark.save();
  } catch (error) {
    console.log(error);
  }

  if (!bookmark) {
    return res.status(404).json({ message: "Couldn't add Bookmark!" });
  }
  return res.status(200).json({ message: "Successfully Updated" });
};

export const getBookmarksByUser = async (req, res) => {
  const userId = req.params.id;
  let bookmark;

  try {
    bookmark = await Bookmark.find({ userDetail: userId });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "Unable to find this User Bookmarks" });
  }

  if (!bookmark) {
    return res.status(404).json({ message: "Cant get this!" });
  }

  return res.status(200).json({ bookmark });
};

export const deleteBookmark = async (req, res) => {
  let bookmarkId = req.params.id;
  let bookmark;

  try {
    bookmark = await Bookmark.findOneAndRemove({ postId: bookmarkId });
  } catch (error) {
    console.log(error);
  }

  if (!bookmark) {
    return res.status(404).json({ message: "Cant Delete this!" });
  }

  return res.status(200).json({ message: "Successfully Deleted Bookmark" });
};
