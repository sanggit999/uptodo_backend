import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String },
  icon: { type: String },
  color: { type: String },
});

export const Category = mongoose.model("Category", categorySchema);
