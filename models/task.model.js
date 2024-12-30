import mongoose from "mongoose";
const taskSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
  title: { type: String, require: true },
  description: { type: String, require: true },
  dueDate: { type: Date, require: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  priority: { type: mongoose.Schema.Types.ObjectId, ref: "Priority" },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const Task = mongoose.model("Task", taskSchema);
