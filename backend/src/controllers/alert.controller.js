import Alert from "../models/Alert.js";

export const getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find()
      .populate("user", "employeeId fullName")
      .populate("event")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      alerts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const acknowledgeAlert = async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      { acknowledged: true },
      { new: true }
    );

    res.json({
      success: true,
      alert,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const resolveAlert = async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      { resolved: true },
      { new: true }
    );

    res.json({
      success: true,
      alert,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};