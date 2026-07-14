import Event from "../models/Event.js";
import User from "../models/User.js";
import aiService from "../services/ai.service.js";

export const createEvent = async (req, res) => {
  try {
    // Find user using employeeId
    const user = await User.findOne({
      employeeId: req.body.employeeId,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Analyze event with AI Service
    const aiResult = await aiService.analyze(req.body);

    // Create Event
    const event = await Event.create({
      user: user._id,

      eventType: req.body.eventType,
      resource: req.body.resource,
      description: req.body.description,

      ipAddress: req.body.ip,
      device: req.body.device,
      location: req.body.country,

      metadata: {
        hour: req.body.hour,
        failedLogins: req.body.failedLogins,
        downloads: req.body.downloads,
        vpn: req.body.vpn,
        usbInserted: req.body.usbInserted,
        adminAction: req.body.adminAction,
      },

      riskScore: aiResult.riskScore,
      riskLevel: aiResult.riskLevel,
    });

    return res.status(201).json({
      success: true,
      event,
      aiResult,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};