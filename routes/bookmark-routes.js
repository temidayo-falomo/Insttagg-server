import express from "express";
import {
  addBookmark,
  deleteBookmark,
  getBookmarksByUser,
} from "../controllers/bookmark-controllers";

const bookmarkRouter = express.Router();

bookmarkRouter.post("/add-bookmark", addBookmark);
bookmarkRouter.get("/bookmark/:id", getBookmarksByUser);
bookmarkRouter.delete("/remove-bookmark/:id", deleteBookmark);

export default bookmarkRouter;
