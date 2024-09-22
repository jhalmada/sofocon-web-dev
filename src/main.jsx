import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index.jsx";
import { BASE_URL } from "./utils/Constants.js";
import axios from "axios";
import { SOFOCON_JWT_TOKEN } from "./utils/Constants.js";

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers["origin-login"] = "dashboard";

axios.interceptors.request.use(
  (request) => {
    const accessToken = localStorage.getItem(SOFOCON_JWT_TOKEN);
    if (accessToken) {
      request.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
