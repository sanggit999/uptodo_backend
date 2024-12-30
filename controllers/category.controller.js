import { Category } from "../models/category.model.js";
import { Color } from "../models/color.model.js";

export const addCategory = async (req, res) => {
  const { name, icon, color } = req.body;

  try {
    const { userId } = req.user;

    if ((!name || !icon, !color)) {
      return res.status(400).json({
        success: false,
        message: "Không được để trống",
      });
    }

    const existingColor = await Color.findById(color);
    if (!existingColor) {
      return res.status(400).json({
        success: false,
        message: "Color không hợp lệ.",
      });
    }

    const category = await Category.create({
      userId,
      name,
      icon,
      color,
    });

    await category.save();

    res.status(201).json({
      success: true,
      category: { ...category._doc },
    });
  } catch (e) {
    console.log("Lỗi trong bộ điều khiển đăng ký", error.message);
    res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
  }
};
