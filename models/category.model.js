import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
  name: { type: String, require: true },
  icon: { type: String, require: true },
  color: { type: mongoose.Schema.Types.ObjectId, ref: "Color" },
});

export const Category = mongoose.model("Category", categorySchema);
