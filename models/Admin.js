const mongoose = require("mongoose");
const Permissions = require("./enums/PermissionsEnum");
const AdminRoles = require("./enums/AdminRolesEnum");

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
      enum: Object.values(AdminRoles),
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
Object.assign(Admin.role, { AdminRoles });
Object.assign(Admin.permissions, { AdminRoles });

module.exports = mongoose.model("Admin", Admin);
