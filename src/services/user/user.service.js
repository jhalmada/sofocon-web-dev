import axios from "axios";
import * as usersRoutes from "./user.routes.js";

export class UserService {
  static getAllUsersApi = async () => await axios.get(usersRoutes.getUsers);
}
