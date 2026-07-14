import { initializeFirebase } from "../config/firebase.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    throw new ApiError(401, "Authentication token missing");
  }

  const token = authHeader.split(" ")[1];

  const auth = initializeFirebase();

  const decoded = await auth.verifyIdToken(token);

  req.user = decoded;

  next();
});

export default authenticate;