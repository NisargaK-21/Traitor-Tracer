import mongoose from "mongoose";
import Roles from "../constants/roles.js";

const userSchema = new mongoose.Schema(
  {
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },

    employeeId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    role: {
      type: String,
      enum: Object.values(Roles),
      default: Roles.EMPLOYEE,
    },

    department: {
      type: String,
      required: true,
    },

    designation: {
      type: String,
      required: true,
    },

    profileImage: {
      type: String,
      default: "",
    },

    lastLogin: Date,

    isActive: {
      type: Boolean,
      default: true,
    },

    metadata: {
      loginCount: {
        type: Number,
        default: 0,
      },

      lastIPAddress: String,

      lastDevice: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("User", userSchema);