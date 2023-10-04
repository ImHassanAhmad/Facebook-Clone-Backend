const multer = require("multer");
const path = require("path");

// Create a storage strategy for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "assets"); // Specify the destination folder
  },
  filename: (req, file, cb) => {
    // Generate a unique file name (you can customize this)
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, uniqueSuffix + fileExtension);
  },
});

// Create a multer instance with the storage configuration
const upload = multer({ storage });

module.exports = upload;
