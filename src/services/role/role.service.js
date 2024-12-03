import axios from "axios";
import * as RolesRoutes from "./role.routes.js";

export class RolesService {
  static getAllRolesApi = async () => await axios.get(RolesRoutes.getRoles);

  static postAddRolesApi = async (roleData) =>
    await axios.post(RolesRoutes.postRoles, roleData);
  static deleteRoleApi = async (userId) =>
    await axios.delete(`${RolesRoutes.deleteRoles}/${userId}`);
  static putRoleApi = async (roleData, userId) =>
    await axios.patch(`${RolesRoutes.putRoles}/${userId}`, roleData);
}
