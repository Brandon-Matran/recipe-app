import express from "express";
import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";
import { UserModel } from "../models/Users.js";

const router = express.Router(); //we set up an instance of express.Router which allows us to create endpoints and use them modularly

router.post("/register", async (req, res) => {
  //we create a post method for users to register, we set an async argument to take in a request and response
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username }); //uses mongoose findOne to find user by username

  if (user) {
    return res.json({ message: "User already registered" }); //this logic checks if there is a user with the username, if there is, we return User already registered
  }
  const hashedPassword = await bcrypt.hash(password, 10); //use bcrypt to hash the users password

  const newUser = new UserModel({ username, password: hashedPassword }); //if there is no user with the username we create the username with a hashed password
  await newUser.save(); //then we save that user to the database
  res.json({ message: "User created successfully" }); //return a success message
});

router.post("/login", async (req, res) => {
  //this endpoint will use JWT token verify the user
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.json({ message: "User not found" }); //this logic checks to see if the user does not exist
  }

  const isPasswordValid = await bcrypt.compare(password, user.password); //this uses bcrypt to compare the password against the users password
  if (!isPasswordValid) {
    return res.json({ message: "Username or Password is incorrect" });
  }

  const token = jwt.sign({ id: user._id }, "secret"); //this line generates a token with the user's id and adds a signature which is the secret
  res.json({ token, userId: user._id });
});

export { router as userRouter };
