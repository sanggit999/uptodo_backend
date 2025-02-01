import express from "express";
import cors from "cors";
import { connectDB } from "./configs/db.js";
import { ENV_VARS } from "./configs/envVars.js";
import authRouter from "./routers/auth.router.js";
import taskRouter from "./routers/task.router.js";
import categoryRouter from "./routers/category.router.js";
const app = express();

const PORT = ENV_VARS.PORT;

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);
app.use("/api/category", categoryRouter);

app.listen(PORT, () => {
  console.log(`Máy chủ đang chạy trên http://localhost:${ENV_VARS.PORT}`);
  connectDB();
});
