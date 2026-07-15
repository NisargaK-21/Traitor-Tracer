import mongoose from "mongoose";
import EventTypes from "../constants/eventTypes.js";
import RiskLevels from "../constants/riskLevels.js";

const eventSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    eventType: {
      type: String,
      enum: Object.values(EventTypes),
      required: true,
    },

    resource: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    ipAddress: {
      type: String,
      required: true,
    },

    device: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      default: "Unknown",
    },

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    riskScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    riskLevel: {
      type: String,
      enum: Object.values(RiskLevels),
      default: RiskLevels.LOW,
    },
    anomaly: {
    type: Boolean,
    default: false,
    },
    reasons: {
      type: [String],
      default: [],  
    },
    signature: {
  type: String,
  required: true,
},
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

eventSchema.index({ eventType: 1 });
eventSchema.index({ createdAt: -1 });
eventSchema.index({ riskScore: -1 });

export default mongoose.model("Event", eventSchema);