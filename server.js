import express from "express";
import { connectDB } from "./configs/db.js";
import { ENV_VARS } from "./configs/envVars.js";
import authRouter from "./routers/auth.router.js";

const app = express();

const PORT = ENV_VARS.PORT;

app.use(express.json());

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Máy chủ đang chạy trên http://localhost:${ENV_VARS.PORT}`);
  connectDB();
});
