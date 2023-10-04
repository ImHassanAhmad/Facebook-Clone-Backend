// routes/statusRoutes.js
const express = require("express");
const router = express.Router();

// Define a route handler for the "/api" path
router.get("/", (req, res) => {
  res.status(200).json({ message: "API running" });
});

module.exports = router;
