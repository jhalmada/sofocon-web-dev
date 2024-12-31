import { useState } from "react";
import { AuthService } from "../../services/auth/auth.service.js";
import {
  SOFOCON_PERMISSIONS,
  SOFOCON_JWT_TOKEN,
  SOFOCON_JWT_REFRESH_TOKEN,
} from "../../utils/Constants.js";
import { useAuthContext } from "../context/AuthContext.jsx";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setUserToken } = useAuthContext();

  const onLogin = async (params) => {
    try {
      setLoading(true);
      const { data } = await AuthService.loginAction(params);
      localStorage.setItem(SOFOCON_JWT_TOKEN, data.access_token);
      localStorage.setItem(SOFOCON_JWT_REFRESH_TOKEN, data.refresh_token);
      localStorage.setItem(SOFOCON_PERMISSIONS, data.permissions);
    
      setUserToken(data.access_token);
      return data.access_token;
    } catch (e) {
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { onLogin, loading };
};

export default useLogin;
