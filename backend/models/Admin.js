const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  onPlatformSince: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Admin", AdminSchema);
