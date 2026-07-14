import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";
import { initializeFirebase } from "./config/firebase.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    initializeFirebase();

    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Backend running on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();