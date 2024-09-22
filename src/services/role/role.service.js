import axios from "axios";
import * as RolesRoutes from "./role.routes.js";

export class RolesService {
  static getAllRolesApi = async () => await axios.get(RolesRoutes.getRoles);
}
