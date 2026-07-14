import Alert from "../models/Alert.js";

class AlertService {
  async createAlert(alertData) {
    return Alert.create(alertData);
  }

  async getAlerts() {
    return Alert.find()
      .populate("user")
      .populate("event")
      .sort({
        createdAt: -1,
      });
  }
}

export default new AlertService();