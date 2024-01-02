const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserScema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  onPlatformSince: {
    type: Date,
    default: Date(Date.now),
  },
});

module.exports = mongoose.model("User", UserScema);
