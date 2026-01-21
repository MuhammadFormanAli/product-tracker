import mongoose from "mongoose";

const ActivityLogSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    meta: Object,
    performedBy: {
      type: String, // IT user name
      default: "IT",
    },
  },
  { timestamps: true }
);

export default mongoose.models.ActivityLog ||
  mongoose.model("ActivityLog", ActivityLogSchema);
