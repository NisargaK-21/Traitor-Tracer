import Roles from "./roles.js";
import Permissions from "./permissions.js";

const RolePermissions = {
  [Roles.EMPLOYEE]: [
    Permissions.CREATE_EVENTS,
  ],

  [Roles.MANAGER]: [
    Permissions.CREATE_EVENTS,
    Permissions.VIEW_EVENTS,
    Permissions.VIEW_DASHBOARD,
  ],

  [Roles.SECURITY_ANALYST]: [
    Permissions.VIEW_EVENTS,
    Permissions.VIEW_ALERTS,
    Permissions.UPDATE_ALERTS,
    Permissions.VIEW_RISK_ANALYSIS,
    Permissions.VIEW_DASHBOARD,
    Permissions.VIEW_SESSIONS,
  ],

  [Roles.ADMIN]: Object.values(Permissions),

  [Roles.SYSTEM_ADMIN]: Object.values(Permissions),
};

export default RolePermissions;