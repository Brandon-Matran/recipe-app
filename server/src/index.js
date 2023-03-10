import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routes/users.js"
const app = express(); //generates a version of our api

app.use(express.json()); //converts data from front-end into json
app.use(cors()); //allows access from front-end to back-end
app.use("/auth", userRouter) //we call userRouter and assign the endpoint /auth to signify that users will be created at this path
dotenv.config(); //loads the env variables from .env
const url = process.env.URI; //extract the needed env variable from the .env

mongoose.connect(url); //connect mongoose(database management) to correct database

app.listen(3001, () => console.log("SERVER STARTED")); //specify the port to run express server
