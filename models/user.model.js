import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  image: { type: String, default: "" },
});

export const User = mongoose.model("User", userSchema);
