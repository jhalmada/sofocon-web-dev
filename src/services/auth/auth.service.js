import axios from "axios";
import * as authRoutes from './auth.routes.js';
import {
  BASE_URL,
  SOFOCON_JWT_REFRESH_TOKEN,
  SOFOCON_JWT_TOKEN,
} from "../../utils/Constants.js";

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

  static refreshTokenAction = async () => {
    try {
      const instance = axios.create({ baseURL: BASE_URL });
      const response = instance.get(authRoutes.refreshToken, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(SOFOCON_JWT_REFRESH_TOKEN)}`,
        },
      });
      localStorage.setItem(SOFOCON_JWT_TOKEN, response.data.access_token);
      localStorage.setItem(
        SOFOCON_JWT_REFRESH_TOKEN,
        response.data.refresh_token,
      );
      return response;
    } catch (error) {
      localStorage.removeItem(SOFOCON_JWT_TOKEN);
      localStorage.removeItem(SOFOCON_JWT_REFRESH_TOKEN);
      window.location.href = "/login";
      return error;
    }
  };
}
