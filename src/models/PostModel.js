// models/PostModel.js
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: String,
    file: {
      type: mongoose.Schema.Types.Mixed,
      url: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true, // Enable timestamps (createdAt and updatedAt)
  }
);

const PostModel = mongoose.model("Post", postSchema);

module.exports = PostModel;
