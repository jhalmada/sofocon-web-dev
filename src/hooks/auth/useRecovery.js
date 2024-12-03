import { useCallback, useState } from "react";
import { AuthService } from "../../services/auth/auth.service.js";

const useRecovery = () => {
  const [loading, setLoading] = useState(false);

  const postRecoveryPassword = useCallback(async (datos) => {
    try {
      setLoading(true);
      const { data } = await AuthService.recoveryPasswordAction(datos);
      return data;
    } catch (e) {
      console.log(e);
      return e;
    } finally {
      setLoading(false);
    }
  }, []);

  return { postRecoveryPassword, loading };
};

export default useRecovery;
