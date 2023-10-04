// services/userService.js
const UserModel = require("../models/UserModel");

// Create a new user
const createUser = async (userData) => {
  const user = new UserModel(userData);
  await user.save();
  return user;
};

// Get all users
const getAllUsers = async () => {
  const users = await UserModel.find();
  return await users;
};

module.exports = {
  createUser,
  getAllUsers,
};
