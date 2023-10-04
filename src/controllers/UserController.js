// controllers/userController.js
const userService = require("../services/UserService");
const Joi = require("joi");

const userSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
});

exports.createUser = async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { username, email } = req.body;
    const userData = { username, email };

    const user = await userService.createUser(userData);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: "Unable to create user" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Unable to fetch users" });
  }
};
