// services/postService.js
const PostModel = require("../models/PostModel");

// Create a new post
const createPost = async (postData) => {
  const post = new PostModel(postData);
  await post.save();
  return post;
};

// Get all posts
const getAllPosts = async (userId, perPage, skip) => {
  return PostModel.find({ userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(perPage);
};

// Delete post
const deletePost = async (postId) => {
  return PostModel.findByIdAndRemove(postId);
};

module.exports = {
  createPost,
  getAllPosts,
  deletePost,
};
