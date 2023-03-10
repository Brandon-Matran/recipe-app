import mongoose from "mongoose";

//we need to create a schema the blueprint for the model we will later create
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

//we will assign a model to our schema because we need to create a collection within our mongoDB database to put these users into
export const UserModel = mongoose.model("users", UserSchema)
