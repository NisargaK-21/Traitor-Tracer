import axios from "axios";

class AIService {
  async analyze(eventData) {
    const response = await axios.post(
      `${process.env.AI_SERVICE_URL}/analyze`,
      eventData
    );

    return response.data.data;
  }
}

export default new AIService();