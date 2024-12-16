const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  image: { type: String, default: "" },
});

module.exports = mongoose.model("User", userSchema);
