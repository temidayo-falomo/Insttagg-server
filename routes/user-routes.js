import express from "express";
import {
  findUser,
  followUser,
  getAllUsers,
  getUser,
  logIn,
  signUp,
  unfollowUser,
  updateUserInfo,
  verifyToken,
} from "../controllers/user-controllers";

const userRouter = express.Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", logIn);
userRouter.get("/user", verifyToken, getUser);
userRouter.get("/all-users", getAllUsers);
userRouter.put("/edit-user/:id", updateUserInfo);
userRouter.get("/user/:id", findUser);
userRouter.put("/follow", followUser);
userRouter.put("/unfollow", unfollowUser);
// userRouter.get("/refresh", refreshToken, verifyToken, getUser);

export default userRouter;
