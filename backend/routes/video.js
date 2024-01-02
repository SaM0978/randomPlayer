const router = require("express").Router();
const adminCheck = require("../middleware/adminCheck");
const Video = require("../models/Video");
const multer = require("multer");
const path = require("path");
const bc = require("bcryptjs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const currentDate = Date.now();
    cb(
      null,
      `${file.originalname.split(".")[0]}-${currentDate}.${path.extname(
        file.originalname
      )}`
    );
  },
});

const upload = multer({ storage: storage });

router.post("/upload", adminCheck, upload.single("video"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const Password = await bc.hash(data.password, 5);

    const video = await Video.create({
      source: req.file.path,
      originalName: req.file.originalname,
      password: Password,
      ownerId: req.user.id,
    });

    res.json(video);
  } catch (error) {
    console.log(error.message);
    res.send("Internal Server Error");
  }
});

router.post("/getvideo", adminCheck, async (req, res) => {
  try {
    const videoName = req.body.videoName;
    const password = req.body.password;
    const video = await Video.findOne({ orignalName: videoName });
    if (!video) {
      return res.statusCode(400).send("Video Not Found");
    }

    if (video.ownerId != req.user.id) {
      return res.statusCode(401).send("Unauthorized Entry");
    }

    const passwordCheck = bc.compare(password, video.password);

    if (!passwordCheck) {
      return res.statusCode(401).send("Incorrect Password");
    }

    res.json(video);
  } catch (error) {
    console.log(error.message);
    res.send("Internal Server Error");
  }
});

router.delete("/deletevideo", adminCheck, async (req, res) => {
  try {
    const videoName = req.body.videoName;
    const password = req.body.password;
    const video = await Video.findOne({ orignalName: videoName });
    if (!video) {
      return res.statusCode(400).send("Video Not Found");
    }

    if (video.ownerId != req.user.id) {
      return res.statusCode(401).send("Unauthorized Entry");
    }

    const passwordCheck = bc.compare(password, video.password);

    if (!passwordCheck) {
      return res.statusCode(401).send("Incorrect Password");
    }

    Video.findByIdAndDelete(video.id);

    res.json("Video Has Been Deleted");
  } catch (error) {
    console.log(error.message);
    res.send("Internal Server Error");
  }
});

module.exports = router;
