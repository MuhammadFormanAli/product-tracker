import mongoose from "mongoose";

const AssignedUserSchema = new mongoose.Schema(
  {
    userName: String,
    employeeId: String,
    designation: String,
    location: String,
    unit: String,
    phone: String,
    email: String,
  },
  { _id: false },
);

// new Repair Schema
const RepairInfoSchema = new mongoose.Schema(
  {
    repairType: {
      type: String,
      enum: ["INTERNAL", "SERVICE_CENTER", "WARRANTY"],
      required: true,
    },

    // info for service center service
    serviceCenter: String,
    location: String,
    phone: String,
    email: String,

    // carrier information
    carrierName: String,
    carrierPhoneNumber: String,

    issueDescription: String,

    sentDate: Date,
    receivedDate: Date,
    deliveryDate: Date,

    repairStatus: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "PENDING",
    },

    repairCost: Number,
    remarks: String,
  },
  { _id: false },
);

const ProductSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      index: true,
    },

    subCategory: {
      type: String,
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
    warranty: Number,

    remarks: String,

    status: {
      type: String,
      enum: ["inStock", "inUse", "inRepair", "damage"],
      default: "inStock", //  DEFAULT
    },

    assignedUser: AssignedUserSchema, // only for inUse

    repairInfo: {
      type: [RepairInfoSchema], //  array of repair objects
      default: [],
    },

    previousUsers: {
      type: [
        {
          user: AssignedUserSchema, // snapshot of user
          assignedAt: Date,
          withdrawnAt: Date,
        },
      ],
      default: [],
    },

    addedBy: {
      type: Object,
      default: {},
    },
  },

  { timestamps: true },
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
