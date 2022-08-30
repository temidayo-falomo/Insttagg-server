import express from "express";
import {
  addMessage,
  getmessagesByUser,
} from "../controllers/messages-controllers";

const messageRouter = express.Router();

messageRouter.post("/", addMessage);
messageRouter.get("/:senderId/:receiverId", getmessagesByUser);

export default messageRouter;
