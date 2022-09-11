import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
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
  userInfoName: {
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
  userDetail: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comments: [
    {
      name: String,
      avatar: String,
      userId: String,
      commentText: String,
      userInfoName: String,
    },
  ],
  likes: [
    {
      name: String,
      avatar: String,
      userId: String,
    },
  ],
});

export default mongoose.model("Posts", PostSchema);
