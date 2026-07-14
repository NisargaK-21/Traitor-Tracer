import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    riskScore: {
      type: Number,
      required: true,
    },

    riskLevel: {
      type: String,
      required: true,
    },

    reason: {
      type: String,
      required: true,
    },

    acknowledged: {
      type: Boolean,
      default: false,
    },

    resolved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Alert", alertSchema);