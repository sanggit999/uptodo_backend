import { Category } from "../models/category.model.js";
import { Task } from "../models/task.model.js";

export const addTask = async (req, res) => {
  const {
    title,
    description,
    dueDate,
    dueHour,
    category,
    priority,
    isCompleted,
    createdAt,
  } = req.body;

  try {
    const userId = req.user.id;
    if (
      !title ||
      !description ||
      !dueDate ||
      !dueHour ||
      !category ||
      !priority
    ) {
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

    const task = await Task.create({
      userId,
      title,
      description,
      dueDate,
      dueHour,
      category,
      priority,
      isCompleted,
      createdAt,
    });

    const populatedTask = await Task.findById(task._id)
      .populate("category", "name icon color") // Lấy name, icon, và color từ Category
      .exec();

    await task.save();

    res.status(201).json({
      success: true,
      task: { ...populatedTask._doc },
    });
  } catch (error) {
    console.log("Lỗi trong bộ điều khiển đăng ký", error.message);
    res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await Task.find({ userId })
      .populate("category", "name icon color") // Lấy các trường cần thiết từ Category
      .exec();
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
