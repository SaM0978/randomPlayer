const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const port = 3000;

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "testUploads/"); // Set the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Set the file name with timestamp
  },
});

const upload = multer({ storage: storage });

// API endpoint for video file upload
app.post("/upload", adminCheck, upload.single("video"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const filePath = req.file.path;
  // You can save the file path to a database or perform other actions as needed.

  res.status(200).send("File uploaded successfully.");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
