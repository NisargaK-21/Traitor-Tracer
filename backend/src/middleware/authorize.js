import ApiError from "../utils/ApiError.js";
import RolePermissions from "../constants/rolePermissions.js";

const authorize = (...requiredPermissions) => {
  return (req, res, next) => {
    const role = req.user.role;

    const permissions = RolePermissions[role] || [];

    const allowed = requiredPermissions.every(permission =>
      permissions.includes(permission)
    );

    if (!allowed) {
      return next(
        new ApiError(
          403,
          "You do not have permission to perform this action."
        )
      );
    }

    next();
  };
};

export default authorize;