import { useState } from "react";
import { UserService } from "../../services/user/user.service";

const useDeleteUsers = () => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const deleteUser = async (userId, setModified) => {
    try {
      setIsLoading(true);
      await UserService.deleteUserApi(userId);
      setIsDeleted(true);
      setModified((prev) => !prev);
      console.log("Usuario eliminado con éxito");
    } catch (error) {
      console.error("Error al eliminar el usuario: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteUser, isDeleted, isLoading };
};

export default useDeleteUsers;
