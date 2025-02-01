import mongoose from "mongoose";
const taskSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: { type: String },
  description: { type: String },
  dueDate: { type: Date },
  dueHour: { type: Date },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  priority: { type: String },
  isCompleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const Task = mongoose.model("Task", taskSchema);
