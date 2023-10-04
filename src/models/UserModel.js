// models/UserModel.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
});

// Create a virtual field to link posts to users
userSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "author",
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
