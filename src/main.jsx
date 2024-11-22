import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index.jsx";
import {
  BASE_URL,
  MAP_API_KEY,
  SOFOCON_JWT_REFRESH_TOKEN,
} from "./utils/Constants.js";
import axios from "axios";
import { SOFOCON_JWT_TOKEN } from "./utils/Constants.js";
import { NextUIProvider } from "@nextui-org/react";
import AuthProvider from "./hooks/context/AuthContext.jsx";
import moment from "moment/moment.js";
import { AuthService } from "./services/auth/auth.service.js";
import * as authRoutes from "./services/auth/auth.routes.js";
import { APIProvider } from "@vis.gl/react-google-maps";

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers["origin-login"] = "dashboard";

const parseJwt = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(""),
  );

  return JSON.parse(jsonPayload);
};

axios.interceptors.request.use(
  async (request) => {
    const accessToken = localStorage.getItem(SOFOCON_JWT_TOKEN);
    if (accessToken) {
      const payLoad = parseJwt(accessToken);
      const date = moment(payLoad.exp * 1000);
      if (moment().isAfter(date)) {
        await refreshTokenAction();
      }
      request.headers["Authorization"] =
        `Bearer ${localStorage.getItem(SOFOCON_JWT_TOKEN)}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const refreshTokenAction = async () => {
  try {
    const instance = axios.create({ baseURL: BASE_URL });
    const response = await instance.get(authRoutes.refreshToken, {
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

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        return axios(originalRequest);
      } catch (_error) {
        if (_error.response && _error.response.data) {
          return Promise.reject(_error.response.data);
        }
        return Promise.reject(_error);
      }
    }
    return Promise.reject(error);
  },
);

createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <AuthProvider>
      <APIProvider apiKey={MAP_API_KEY}>
        <RouterProvider router={router} />
      </APIProvider>
    </AuthProvider>
  </NextUIProvider>,
);
