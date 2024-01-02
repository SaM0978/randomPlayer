require("dotenv").config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const defPass = process.env.defPass;

const VideoFile = new Schema({
  source: {
    type: String,
    required: true,
    unique: true,
  },
  orignalName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    default: defPass,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Admin",
  },
  uploadedOn: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Video", VideoFile);
