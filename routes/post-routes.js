import express from "express";
import {
  commentOnPost,
  // bookmarkCheck,
  deletePost,
  dislikePost,
  getAllPosts,
  getPostById,
  likePost,
  updatePost,
  uploadPost,
} from "../controllers/post-controllers";

const postRouter = express.Router();

postRouter.get("/", getAllPosts);
postRouter.post("/upload-post", uploadPost);
postRouter.put("/edit-post/:id", updatePost);
postRouter.get("/:id", getPostById);
postRouter.delete("/delete/:id", deletePost);
postRouter.put("/like", likePost);
postRouter.put("/comment", commentOnPost);
postRouter.put("/unlike", dislikePost);

export default postRouter;
