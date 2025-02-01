import { Category } from "../models/category.model.js";

export const addCategory = async (req, res) => {
  const { userId, name, icon, color } = req.body;

  try {
    req.body.userId = req.user.id;

    if ((!name || !icon, !color)) {
      return res.status(400).json({
        success: false,
        message: "Không được để trống",
      });
    }

    // const existingColor = await Color.findById(color);
    // if (!existingColor) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Color không hợp lệ.",
    //   });
    // }

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

export const getCategories = async (req, res) => {
  try {
    const userId = req.user.id;
    //console.log("User ID:", userId);
    const categories = await Category.find({ userId });
    if (categories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy tác vụ nàos",
      });
    }

    res.status(200).json({
      success: true,
      categories: categories.map((categories) => categories._doc),
    });
  } catch (error) {
    console.log("Lỗi khi lấy danh sách tác vụ", error.message);
    res.status(500).json({
      success: false,
      message: "Lỗi máy chủ nội bộ",
    });
  }
};
