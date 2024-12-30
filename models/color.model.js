import mongoose from "mongoose";

const colorSchema = mongoose.Schema({
  hexCodes: { type: [String], require: true },
});

export const Color = mongoose.model("Color", colorSchema);
