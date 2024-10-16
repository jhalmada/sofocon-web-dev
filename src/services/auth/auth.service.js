import axios from "axios";
import * as authRoutes from './auth.routes.js';

export class AuthService {
  /**
   * Params: username, password
   * @param params
   * @returns {Promise<axios.AxiosResponse<any>>}
   */
  static loginAction = async (params) =>
    await axios.post(authRoutes.login, params);
  static recoveryPasswordAction = async (params) =>
    await axios.post(authRoutes.recovery, params);
}
