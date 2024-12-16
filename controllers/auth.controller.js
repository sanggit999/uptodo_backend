const User = require("../models/user.model.js");
const bcryptjs = require("bcryptjs");
const generateToken = require("../utils/generateToken.js");

// Đăng ký
const signup = async (req, res) => {
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

module.exports = { signup };
