const jwt = require("jsonwebtoken");
const { ENV_VARS } = require("../configs/envVars");

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    ENV_VARS.JWT_SECRET,
    { expiresIn: "7d" } // Token hạn 7 ngà
  );
};

module.exports = generateToken;
