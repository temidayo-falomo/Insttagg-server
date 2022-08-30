import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  profession: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  posts: [{ type: mongoose.Types.ObjectId, ref: "Post", required: true }],
  friends: [{ type: mongoose.Types.ObjectId, ref: "Friend", required: true }],
  followers: [{ name: String, avatar: String, userId: String }],
  following: [{ name: String, avatar: String, userToAddToUserId: String }],
  stories: [{ name: String }],
});

export default mongoose.model("User", UserSchema);
