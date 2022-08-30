import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MessagesSchema = new Schema({
  avatar: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  senderId: {
    type: String,
    required: true,
  },
  receiverId: {
    type: String,
    required: true,
  },
  senderUserName: {
    type: String,
    required: true,
  },
  receiverUsername: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Messages", MessagesSchema);
