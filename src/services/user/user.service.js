import axios from "axios";
import * as usersRoutes from "./user.routes.js";

export class UserService {
  static getAllUsersApi = async (params) =>
    await axios.get(usersRoutes.getUsers, { params });

  static postAddUsersApi = async (userData) =>
    await axios.post(usersRoutes.postUsers, userData);
  static putUserApi = async (userData, userId) =>
    await axios.put(`${usersRoutes.putUsers}/${userId}`, userData);

  static deleteUserApi = async (userId) =>
    await axios.delete(`${usersRoutes.deleteUsers}/${userId}`);

  static getUsersSellersApi = async (params) =>
    await axios.get(usersRoutes.getUsersSeller, { params });

  static putUserApiPassword = async (userData, token) =>
    await axios.put(usersRoutes.putUsersPassword, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
}
