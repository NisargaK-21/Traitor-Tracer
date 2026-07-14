import User from "../models/User.js";
import Event from "../models/Event.js";
import Alert from "../models/Alert.js";

export const overview = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalEvents = await Event.countDocuments();
    const totalAlerts = await Alert.countDocuments();
    const highRiskEvents = await Event.countDocuments({
      riskLevel: "HIGH",
    });

    res.json({
      success: true,
      totalUsers,
      totalEvents,
      totalAlerts,
      highRiskEvents,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const leaderboard = async (req, res) => {
  try {
    const leaderboard = await Event.aggregate([
      {
        $group: {
          _id: "$user",
          averageRisk: { $avg: "$riskScore" },
          totalEvents: { $sum: 1 },
        },
      },
      {
        $sort: {
          averageRisk: -1,
        },
      },
    ]);

    res.json({
      success: true,
      leaderboard,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};