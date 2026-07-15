// import axios from "axios";

// class AIService {
//   async analyze(eventData) {
//     const response = await axios.post(
//       `${process.env.AI_SERVICE_URL}/analyze`,
//       eventData
//     );

//     return response.data.data;
//   }
// }

// export default new AIService();


import axios from "axios";

class AIService {
  async analyze(eventData) {
    try {
      console.log("AI URL:", `${process.env.AI_SERVICE_URL}/analyze`);
      console.log("Sending:", eventData);

      const response = await axios.post(
        `${process.env.AI_SERVICE_URL}/analyze`,
        eventData,
        {
          timeout: 10000,
        }
      );

      console.log("AI Status:", response.status);
      console.log("AI Data:", response.data);

      return response.data.data;

    } catch (err) {
      console.error("========= AI SERVICE ERROR =========");

      console.error(err.message);

      if (err.response) {
        console.error("Status:", err.response.status);
        console.error("Response:", err.response.data);
      }

      console.error("===================================");

      throw err;
    }
  }
}

export default new AIService();