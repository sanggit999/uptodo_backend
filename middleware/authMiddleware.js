const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const { ENV_VARS } = require("../configs/envVars.js");

const authMiddleware = async (req, res, next) => {
  try {
    // Lấy token từ header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Không có mã thông báo nào được cung cấp.",
      });
    }

    const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Token không hợp lệ" });
    }
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    console.log("Lỗi trong phần mềm trung gian : ", error.message);
    res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
  }
};

module.exports = authMiddleware;
