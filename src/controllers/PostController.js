const mongoose = require("mongoose");
const postService = require("../services/PostService");
const Joi = require("joi");

const postSchema = Joi.object({
  title: Joi.string(),
  type: Joi.string().valid("image", "video"),
  userId: Joi.string().required(),
});

function validateWithJoi(schema, body, res) {
  // Validate the JSON object using Joi
  const { error, value } = schema.validate(body, {
    stripUnknown: true, // Remove unknown keys from the request body
  });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  body = value;
}

function validateObjId(res, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid ID." });
  }
}

exports.createPost = async (req, res) => {
  try {
    validateWithJoi(postSchema, req.body, res);
    const { title, userId, type } = req.body;

    validateObjId(res, userId);

    const postData = { title, userId };
    if (req.file) {
      postData.file = {
        type,
        url: req.file.filename,
      };
    }

    const post = await postService.createPost(postData);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: "Unable to create post" });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const userId = req.params.userId;
    validateObjId(res, userId);

    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;
    const skip = (page - 1) * perPage;

    const posts = await postService.getAllPosts(userId, perPage, skip);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch posts" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const postId = req.params.postId;

    validateObjId(res, postId);

    // Use Mongoose to find and remove the post by its ID
    const deletedPost = await postService.deletePost(postId);

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Unable to delete post" });
  }
};
