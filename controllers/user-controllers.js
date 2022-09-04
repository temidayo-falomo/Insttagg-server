import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//*SignUp Function

export const signUp = async (req, res, next) => {
  let existingUser;

  try {
    existingUser = await User.findOne({ username: req.body.username });
  } catch (error) {
    console.log(error);
  }

  if (existingUser) {
    return res.status(404).json({ message: "Username Already Exists!" });
  }

  let hashedPassword = bcrypt.hashSync(req.body.password);

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
    profession: req.body.profession,
    avatar: req.body.avatar,
    bio: req.body.bio,
    username: req.body.username,
  });

  try {
    user.save();
  } catch (error) {
    console.log(error);
  }

  return res.status(201).json({ message: "Successfully Signed In" });
};

//*Login Function()

export const logIn = async (req, res, next) => {
  let existingUser;

  try {
    existingUser = await User.findOne({ email: req.body.email });
  } catch (error) {
    console.log(error);
  }

  if (!existingUser) {
    return res.status(404).json({ message: "Incorrect Credentials!" });
  }

  //"existingUser" has become a single object(The object we found from MongoDb)

  const isPasswordCorrect = bcrypt.compareSync(
    req.body.password,
    existingUser.password
  );

  if (!isPasswordCorrect) {
    return res
      .status(404)
      .json({ message: "Invalid Password, please enter correct password!" });
  }

  //IF password is correct, generate jwt token.
  //Its somewhat important to note that the JWT is encoding only the id of the existingUser object s

  const token = jwt.sign({ id: existingUser._id }, "MyKeyXo", {
    expiresIn: "20days",
  });

  //Storing Stuff in a cookie(Reference Postman Cookies Tab for Context)

  res.clearCookie();

  res.cookie(String(existingUser._id), token, {
    // path: "/",
    // expires: new Date(Date.now() + 1000 * 1000),
    sameSite: "none",
    secure: true,
    maxAge: 1000 * 60 * 60,
    // domain: "https://insttagg.herokuapp.com",
  });

  return res.status(200).json({
    message: "Successfully Logged In",
    user: existingUser,
  });
};

//*Verify Token Function
//Verify Token, Then Get User(Check routes folder for context)

export const verifyToken = async (req, res, next) => {
  const cookies = req.headers.cookie;
  //"cookies" return two different strings = each other, which are id(name) and value(token)
  const token = cookies.split("=")[1];
  if (!token) {
    return res.status(404).json({ message: "No Token Found" });
  }
  jwt.verify(String(token), "MyKeyXo", (err, user) => {
    if (err) {
      return res.status(400).json({ message: "Invalid Token" });
    }
    //Yes "user" Is an Object pulled from when we verified jwt🫠
    req.id = user.id;
    next();
  });
};

//*Get User Function

export const getUser = async (req, res, next) => {
  const userId = req.id;
  let user;

  try {
    user = await User.findById(userId, "-password");
  } catch (error) {
    return new Error(err);
  }

  if (!user) {
    return res.status(404).json({ message: "User Not Found" });
  }

  return res.status(200).json({ user });
};

//* Refresh Token

export const refreshToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split("=")[1];
  if (!prevToken) {
    return res.status(400).json({ message: "Couldn't Find Token" });
  }
  jwt.verify(String(prevToken), "MyKeyXo", (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Auth Failed" });
    }

    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = "";

    const token = jwt.sign({ id: user.id }, "MyKeyXo", {
      expiresIn: "20days",
    });

    res.cookie(String(user.id), token, {
      // path: "/",
      // expires: new Date(Date.now() + 10000 * 10000),
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60,
      // domain: "https://insttagg.herokuapp.com",
      // httpOnly: true,
    });

    req.id = user.id;
    next();
  });
};

export const getAllUsers = async (req, res) => {
  let users;

  try {
    users = await User.find();
  } catch (error) {
    console.log(error);
  }

  if (!users) {
    return res.status(404).json({ message: "Couldn't get users" });
  }

  return res.status(200).json({ users });
};

export const updateUserInfo = async (req, res, next) => {
  const userId = req.params.id;
  let user;

  try {
    user = await User.findByIdAndUpdate(userId, {
      avatar: req.body.avatar,
      profession: req.body.profession,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      bio: req.body.bio,
    });
  } catch (error) {
    console.log(error);
  }

  if (!user) {
    return res.status(404).json({ message: "Cant get this!" });
  }

  return res.status(200).json({ message: "Update Successful" });
};

export const findUser = async (req, res) => {
  const userId = req.params.id;
  let user;

  try {
    user = await User.findOne({ username: userId }, "-password");
  } catch (error) {
    console.log(error);
  }

  if (!user) {
    return res.status(404).json({ message: "User Not Fouund" });
  }

  return res.status(200).json({ user });
};

export const followUser = async (req, res) => {
  const userToBeFollowed = req.body.userToAddToUserId;
  const currentUser = req.body.userId;

  let userToAddTo;
  let existingUser;

  const currentUserDetails = {
    name: req.body.currentUserName,
    avatar: req.body.currentUserAvatar,
    userId: req.body.userId,
  };

  const userToAddToDetails = {
    name: req.body.userToAddToName,
    avatar: req.body.userToAddToAvatar,
    userToAddToUserId: req.body.userToAddToUserId,
  };

  try {
    userToAddTo = await User.findByIdAndUpdate(userToBeFollowed, {
      $push: { followers: currentUserDetails },
    });

    existingUser = await User.findByIdAndUpdate(currentUser, {
      $push: { following: userToAddToDetails },
    });
  } catch (error) {
    console.log(error);
  }

  if (!userToAddTo && !existingUser) {
    return res.status(500).json({ message: "Unable To Follow" });
  }

  return res.status(200).json({ message: "Successfully Followed" });
};

//friends are highlighted in FE

export const unfollowUser = async (req, res) => {
  const userToBeUnFollowed = req.body.userToBeUnFollowed;
  const currentUser = req.body.currentUser;

  let userToRemoveFrom;
  let existingUser;

  try {
    userToRemoveFrom = await User.findByIdAndUpdate(userToBeUnFollowed, {
      $pull: { followers: { userId: currentUser } },
    });

    existingUser = await User.findByIdAndUpdate(currentUser, {
      $pull: { following: { userToAddToUserId: userToBeUnFollowed } },
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }

  if (!userToRemoveFrom && !existingUser) {
    return res.status(500).json({ message: "Unable To Un-Follow" });
  }

  return res.status(200).json({ message: "Successfully Un-followed" });
};
