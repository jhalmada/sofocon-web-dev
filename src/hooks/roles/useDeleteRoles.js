import { useCallback, useEffect, useState } from "react";
import { RolesService } from "../../services/role/role.service.js";

const useDeleteRoles = () => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const deleteUser = useCallback(async (userId) => {
    try {
      setIsLoading(true);
      await RolesService.deleteRoleApi(userId);
      setIsDeleted(true);
    } catch (error) {
      console.error("Error al eliminar rol: ", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { deleteUser, isDeleted, isLoading };
};

export default useDeleteRoles;
