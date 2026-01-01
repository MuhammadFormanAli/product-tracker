import mongoose from "mongoose";

const AdminUserSchema = new mongoose.Schema(
  {
    adminName: { type: String, required: true },
    employeeId: { type: String, required: true, unique: true },
    password: { type: String, required: true, },
    userRole: { type: String, default: "admin"},
  },
  { timestamps: true }
);

export default mongoose.models.AdminUser ||
  mongoose.model("AdminUser", AdminUserSchema);
