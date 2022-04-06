const mongoose = require("mongoose");
const LogAction = require("./enums/LogActionEnum");

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
    logs: [
      {
        actionType: {
          type: String,
          required: true,
          trim: true,
          enum: Object.values(LogAction),
        },
        input: {
          type: String,
          required: true,
          trim: true,
        },
        timestamp: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  { timestamps: true }
);

Object.assign(User.statics, { LogAction });

module.exports = mongoose.model("User", User);
