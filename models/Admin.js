const mongoose = require("mongoose");
const Permissions = require("./enums/PermissionsEnum");
const AdminRoles = require("./enums/AdminRolesEnum");

const Admin = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      trim: true,
      enum: Object.values(AdminRoles),
    },
    name: {
      type: String,
      trim: true,
    },
    permissions: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
          enum: Object.values(Permissions),
        },
        boolean: {
          type: Boolean,
          required: true,
          default: false,
        },
      },
    ],
    logs: [
      {
        action: {
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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
Object.assign(Admin.statics, { AdminRoles, Permissions });

module.exports = mongoose.model("Admin", Admin);
