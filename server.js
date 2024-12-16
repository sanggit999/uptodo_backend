const express = require("express");
const connectDB = require("./configs/db");
const { ENV_VARS } = require("./configs/envVars");
const authRouter = require("./routers/auth.router");

const app = express();
app.use(express.json());

app.use("/api/auth", authRouter);

app.listen(ENV_VARS.PORT, () => {
  console.log(`Máy chủ đang chạy trên http://localhost:${ENV_VARS.PORT}`);
  connectDB();
});
