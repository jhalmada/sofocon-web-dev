import { useCallback, useState } from "react";
import { UserService } from "../../services/user/user.service";

const useDeleteUsers = () => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const deleteUser = useCallback(async (userId) => {
    try {
      setIsLoading(true);
      await UserService.deleteUserApi(userId);
      setIsDeleted(true);
    } catch (error) {
      console.error("Error al eliminar el usuario: ", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { deleteUser, isDeleted, isLoading };
};

export default useDeleteUsers;
