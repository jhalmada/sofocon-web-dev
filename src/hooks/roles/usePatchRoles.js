import { useCallback, useState } from "react";
import { RolesService } from "../../services/role/role.service.js";

const usePatchRoles = () => {
  const [isChanged, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const changedUser = useCallback(async (roleData, userId, setRolModified) => {
    try {
      setIsLoading(true);
      await RolesService.putRoleApi(roleData, userId);
      setIsChanged(true);
      setRolModified((prev) => !prev);
    } catch (error) {
      console.error("Error al modificar rol: ", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { changedUser, isChanged, isLoading };
};

export default usePatchRoles;
