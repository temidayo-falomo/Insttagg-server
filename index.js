import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/user-routes";
import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import postRouter from "./routes/post-routes";
import bookmarkRouter from "./routes/bookmark-routes";
import messageRouter from "./routes/message-routes";

const app = express();
app.use(
  cors({
    origin: [
      "https://api.cloudinary.com",
      "http://localhost:3001",
      "http://localhost:3000",
      "http://localhost:5600/api",
      "https://random-word-api.herokuapp.com/word",
      "https://www.passwordrandom.com",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/bookmarks", bookmarkRouter);
app.use("/api/messages", messageRouter);

mongoose
  .connect(
    `mongodb+srv://temidayo:H26VmfkBFuvc5Het@undev.nc7mk.mongodb.net/undev?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(process.env.PORT || 5600);
  })
  .then(() => {
    console.log("Connected To Database....");
  })
  .catch((err) => {
    console.log(err);
  });
