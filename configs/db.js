import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
  try {
    await mongoose
      .connect(ENV_VARS.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Kết nối thành công với MongoDB");
      });
  } catch (e) {
    console.log("Kết nối không thành công với MongoDB");
    process.exit(1);
  }
};
