const mongoose = require("mongoose");
const { ENV_VARS } = require("./envVars");

const connectDB = async () => {
  try {
    await mongoose.connect(ENV_VARS.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Kết nối thành công với MongoDB");
  } catch (e) {
    console.log("Kết nối không thành công với MongoDB");
    process.exit(1);
  }
};

module.exports = connectDB;
