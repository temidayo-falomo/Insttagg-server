import mongoose from "mongoose";
import Messages from "../models/Messages";

export const addMessage = async (req, res) => {
  let userMessage;

  try {
    userMessage = new Messages({
      avatar: req.body.avatar,
      message: req.body.message,
      time: req.body.time,
      senderId: req.body.senderId,
      receiverId: req.body.receiverId,
      senderUserName: req.body.senderUserName,
      receiverUsername: req.body.receiverUsername,
    });

    await userMessage.save();
  } catch (error) {
    console.log(error);
  }

  if (!userMessage) {
    return res.status(404).json({ message: "Unable To Add Message" });
  }

  return res.status(200).json({ message: "Message Sent!" });
};

export const getmessagesByUser = async (req, res) => {
  const senderId = req.params.senderId;
  const receiverId = req.params.receiverId;
  let userMessage;

  const firstCondition = {
    senderId: senderId,
    receiverId: receiverId,
  };

  const secondCondition = {
    receiverId: senderId,
    senderId: receiverId,
  };

  try {
    userMessage = await Messages.find({
      $or: [firstCondition, secondCondition],
    });
  } catch (error) {
    console.log(error);
  }

  if (!userMessage) {
    return res
      .status(404)
      .json({ message: "Unable To Get Messages from this user" });
  }

  return res.status(200).json({ userMessage: userMessage });
};
