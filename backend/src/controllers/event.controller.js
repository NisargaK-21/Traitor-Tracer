import Event from "../models/Event.js";
import User from "../models/User.js";
import Alert from "../models/Alert.js";
import aiService from "../services/ai.service.js";
export const createEvent = async (req, res) => {
  try {
    console.log("STEP 1 - Request received");

    const user = await User.findOne({
      employeeId: req.body.employeeId,
    });

    console.log("STEP 2 - User found:", user?.employeeId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.log("STEP 3 - Calling AI Service");

    const aiResult = await aiService.analyze(req.body);

    console.log("STEP 4 - AI Response:", aiResult);

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

    console.log("STEP 5 - Event created");

    let alert = null;

    if (aiResult.riskScore >= 40) {
      console.log("STEP 6 - Creating alert");

      alert = await Alert.create({
        event: event._id,
        user: user._id,
        riskScore: aiResult.riskScore,
        riskLevel: aiResult.riskLevel,
        reason: aiResult.reasons.join(", "),
      });

      console.log("STEP 7 - Alert created");
    }

    return res.status(201).json({
      success: true,
      event,
      alert,
      aiResult,
    });

  } catch (err) {
    console.error("========== EVENT ERROR ==========");
    console.error(err);
    console.error(err.stack);

    if (err.response) {
      console.error("Status:", err.response.status);
      console.error("Data:", err.response.data);
    }

    console.error("===============================");

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("user", "employeeId fullName email role")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      events,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("user", "employeeId fullName email role");

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.json({
      success: true,
      event,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};