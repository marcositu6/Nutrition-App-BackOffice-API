const mongoose = require("mongoose");

const Admin = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      trim: true,
      default: "Admin",
      enum: Object.values(AdminRoles),
    },
    permissions: {
      type: Array,
      default: {},
      enum: Permissions,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", Admin);
