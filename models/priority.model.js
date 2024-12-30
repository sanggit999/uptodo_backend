import mongoose from "mongoose";

const prioritySchema = mongoose.Schema({
  levels: { type: [Number], require: true },
});

export const Priority = mongoose.model("Priority", prioritySchema);
