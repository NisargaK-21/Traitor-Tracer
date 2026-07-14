import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import authService from "../services/auth.service.js";
import Roles from "../constants/roles.js";

const login = asyncHandler(async (req, res) => {
  const firebaseUser = req.user;

  let user = await authService.findUser(firebaseUser.uid);

  const resolvedName =
    firebaseUser.name ||
    firebaseUser.display_name ||
    firebaseUser.email?.split("@")[0] ||
    "Employee";

  if (!user) {
    user = await authService.createUser({
      firebaseUid: firebaseUser.uid,
      employeeId: `EMP${Date.now()}`,
      fullName: resolvedName,
      email: firebaseUser.email,
      role: Roles.EMPLOYEE,
      department: "Banking Operations",
      designation: "Banking Officer",
    });
  } else if (user.fullName === "Unknown User" || user.fullName === "Employee") {
    user = await authService.updateName(user._id, resolvedName);
  }

  const ipAddress =
    req.headers["x-forwarded-for"] ||
    req.socket.remoteAddress ||
    "Unknown";

  const device = req.headers["user-agent"] || "Unknown";

  user = await authService.updateLogin(
    user._id,
    ipAddress,
    device
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Login successful",
      user
    )
  );
});

export { login };