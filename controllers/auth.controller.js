import bcryptjs from "bcryptjs";
import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

// Đăng ký
export const signup = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, massage: "Không được để trống" });
    }

    const usernameRegex =
      /^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){6,18}[a-zA-Z0-9]$/;

    if (!usernameRegex.test(username)) {
      return res
        .status(400)
        .json({ success: false, message: "Username không hợp lệ" });
    }

    const passwordRegex =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,20}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Mật khẩu phải có chữ viết hoa, ký tự đặc biệt, 7 ký tự",
      });
    }

    const existingUserByUsername = await User.findOne({ username: username });

    if (existingUserByUsername) {
      return res
        .status(400)
        .json({ success: false, message: "Username đã tồn tại" });
    }

    // Tạo salt và hasd password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Tạo User
    const user = await User.create({ username, password: hashedPassword });

    // Tạo JWT
    const token = await generateToken(user._id);

    await user.save();

    res.status(201).json({
      success: true,
      user: {
        ...user._doc,
        token: token,
      },
    });
  } catch (error) {
    console.log("Lỗi trong bộ điều khiển đăng ký", error.message);
    res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
  }
};

// Đăng nhập
export const signin = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, massage: "Không được để trống" });
    }

    // Tìm user theo username
    const user = await User.findOne({ username: username });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Tài khoản không tồn tại" });
    }

    // So sánh mật khẩu với hash trong cơ sở dữ liệu
    const isPasswordMatch = await bcryptjs.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Mật khẩu không chính xác" });
    }

    // Tạo JWT token
    const token = await generateToken(user._id);

    res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        token: token,
      },
    });
  } catch (error) {
    console.log("Lỗi trong bộ điều khiển đăng ký", error.message);
    res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Loại bỏ password
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User không tồn tại" });
    }
    res.status(200).json({
      success: true,
      user: user._doc,
    });
  } catch (e) {
    console.log("Lỗi trong bộ điều khiển đăng ký", error.message);
    res.status(500).json({ success: false, message: "Lỗi máy chủ nội bộ" });
  }
};
