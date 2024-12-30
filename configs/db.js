import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";
import { Priority } from "../models/priority.model.js";
import { Color } from "../models/color.model.js";

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

// const colorData = {
//   hexCodes: [
//     "0xffC9CC41",
//     "0xff41CCA7",
//     "0xff4181CC",
//     "0xff41A2CC",
//     "0xffCC8441",
//     "0xff9741CC",
//     "0xffCC4173",
//   ],
// };

// const insertColors = async () => {
//   try {
//     await Color.insertMany(colorData);
//     console.log("Colors inserted successfully");
//   } catch (error) {
//     console.error("Error inserting colors:", error);
//   }
// };

// const priorityData = { levels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] };

// const insertPriorities = async () => {
//   try {
//     // Sử dụng insertMany để insert tất cả dữ liệu vào MongoDB
//     await Priority.insertMany(priorityData);
//     console.log("Priorities inserted successfully");
//   } catch (error) {
//     console.error("Error inserting priorities:", error);
//   }
// };
