const express = require("express");
const connectDB = require("./configs/db");
const { ENV_VARS } = require("./configs/envVars");

connectDB();
const app = express();

app.listen(ENV_VARS.PORT, () =>
  console.log(`Máy chủ đang chạy trên http://localhost:${ENV_VARS.PORT}`)
);
