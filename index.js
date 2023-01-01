import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";

import userRouter from "./routes/user-routes.js";
import postRouter from "./routes/post-routes.js";
import bookmarkRouter from "./routes/bookmark-routes.js";
import messageRouter from "./routes/message-routes.js";

const app = express();

app.use(
  cors({
    origin: [
      "https://api.cloudinary.com",
      "http://localhost:3000",
      "https://insttagg-client.vercel.app",
    ],
    credentials: true,
    allowedHeaders:
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  })
);

app.use(express.json());
app.use(cookieParser());

app.set("trust proxy", 1);

app.use("/api", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/bookmarks", bookmarkRouter);
app.use("/api/messages", messageRouter);

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(process.env.PORT || 9000);
  })
  .then(() => {
    console.log("Connected To Database....");
  })
  .catch((err) => {
    console.log(err);
  });
