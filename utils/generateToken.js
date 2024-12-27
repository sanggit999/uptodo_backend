import jwt from "jsonwebtoken";
import { ENV_VARS } from "../configs/envVars.js";

export const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    ENV_VARS.JWT_SECRET,
    { expiresIn: "7d" } // Token hạn 7 ngà
  );
};
