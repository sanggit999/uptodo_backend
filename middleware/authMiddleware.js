import jwt from "jsonwebtoken";
import { ENV_VARS } from "../configs/envVars.js";
import { User } from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    // Lấy token từ header
    // const token = req.headers.authorization?.split(" ")[1];
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Không có mã thông báo nào được cung cấp.",
      });
    }

    const decoded = jwt.verify(token.split(" ")[1], ENV_VARS.JWT_SECRET); // Xác thực
    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Token không hợp lệ" });
    }
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Không tìm thấy người dùng" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Lỗi trong phần mềm trung gian : ", error.message);
    res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
  }
};
