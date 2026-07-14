import axios from "axios";
import logger from "../utils/logger.js";

class AIService {
  constructor() {
    this.baseURL = process.env.AI_SERVICE_URL;
  }

  async analyzeEvent(event) {
    try {
      const response = await axios.post(
        `${this.baseURL}/analyze`,
        event,
        {
          timeout: 5000,
        }
      );

      return response.data;
    } catch (error) {
      logger.error(`AI Service Error: ${error.message}`);

      return {
        riskScore: 0,
        riskLevel: "LOW",
        reason: "AI Service Unavailable",
      };
    }
  }
}

export default new AIService();