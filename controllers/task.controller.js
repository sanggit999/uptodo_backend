import { Category } from "../models/category.model.js";
import { Priority } from "../models/priority.model.js";
import { Task } from "../models/task.model.js";

export const addTask = async (req, res) => {
  const { userId, title, description, dueDate, category, priority, completed } =
    req.body;

  try {
    req.body.userId = req.user._id;
    if (!title || !description || !dueDate || !category || !priority) {
      return res
        .status(400)
        .json({ success: false, messages: "Không được để trống" });
    }

    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category không hợp lệ.",
      });
    }

    const existingPriority = await Priority.findById(priority);
    if (!existingPriority) {
      return res.status(400).json({
        success: false,
        message: "Priority không hợp lệ.",
      });
    }

    const task = await Task.create({
      userId,
      title,
      description,
      dueDate,
      category,
      priority,
      completed,
    });

    await task.save();

    res.status(201).json({
      success: true,
      task: { ...task._doc },
    });
  } catch (e) {
    console.log("Lỗi trong bộ điều khiển đăng ký", error.message);
    res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const userId = req.user.id; // Xác nhận userId từ req.user

    console.log("User ID:", userId); // Debug: kiểm tra xem userId có đúng không

    const tasks = await Task.find({ userId });
    if (tasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy tác vụ nào",
      });
    }

    res.status(200).json({
      success: true,
      tasks: tasks.map((task) => task._doc),
    });
  } catch (error) {
    console.log("Lỗi khi lấy danh sách tác vụ", error.message);
    res.status(500).json({
      success: false,
      message: "Lỗi máy chủ nội bộ",
    });
  }
};
