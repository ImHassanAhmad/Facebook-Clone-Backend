// routes/postRoutes.js
const express = require("express");
const router = express.Router();
const postController = require("../controllers/PostController");
const upload = require("../multer");

// Create a new post
router.post("/posts", upload.single("file"), postController.createPost);

// Get all user posts
router.get("/posts/:userId", postController.getAllPosts);

// Delete post
router.delete("/posts/:postId", postController.deletePost);

module.exports = router;
