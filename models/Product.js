import mongoose from "mongoose";

const AssignedUserSchema = new mongoose.Schema(
  {
    userName: String,
    employeeId: String,
    designation: String,
    location: String,
    phone: String,
    email: String,
  },
  { _id: false }
);

const RepairInfoSchema = new mongoose.Schema(
  {
    serviceCenter: String,
    location: String,
    phone: String,
    email: String,
    carrierName: String,
  },
  { _id: false }
);

const ProductSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      index: true,
    },

    serialNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    brand: String,
    model: String,

    purchaseDate: Date,
    warranty: String,
    remarks: String,

    
    status: {
      type: String,
      enum: ["inStock", "inUse", "inRepair", "damage"],
      default: "inStock", // ✅ DEFAULT
    },

    assignedUser: AssignedUserSchema, // only for inUse
    repairInfo: RepairInfoSchema, // only for inRepair
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
