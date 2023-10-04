// seeder.js
const mongoose = require("mongoose");
const UserModel = require("../models/UserModel"); // Replace with the actual path to your User model

async function seedDatabase(mongoURI) {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Check if there are any users in the database
    const usersCount = await UserModel.countDocuments();

    if (usersCount === 0) {
      // Create a default user
      const defaultUser = new UserModel({
        username: "default_user",
        email: "default@example.com",
      });

      await defaultUser.save();
      console.log("Default user added to the database.");
    } else {
      console.log("Users already exist in the database. No action taken.");
    }
  } catch (error) {
    console.error("Seeder error:", error);
  }
}

module.exports = seedDatabase;
