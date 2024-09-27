import { useState } from "react";
import { UserService } from "../../services/user/user.service.js";

const usePutusers = () => {
  const [isChanged, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const changedUser = async (userData, userId, setModified) => {
    try {
      setIsLoading(true);
      await UserService.putUserApi(userData, userId);
      setModified((prev) => !prev);
      return true;
    } catch (error) {
      console.error("Error al modificar el usuario: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { changedUser, isChanged, isLoading };
};

export default usePutusers;
