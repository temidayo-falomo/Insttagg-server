import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BookmarkSchema = new Schema({
  avatar: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  postText: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  saved: {
    type: Boolean,
    required: true,
  },
  userDetail: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comments: [
    { type: mongoose.Types.ObjectId, ref: "Comments", required: true },
  ],
  likes: [{ type: mongoose.Types.ObjectId, ref: "Likes", required: true }],
});

export default mongoose.model("bookmarks", BookmarkSchema);
