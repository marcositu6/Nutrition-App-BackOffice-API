const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      default: "",
    },
    password: { type: String, required: true },
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", User);
