import { useState } from "react";
import { UserService } from "../../services/user/user.service.js";

const usePutSellerPassword = () => {
  const [isChanged, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const changedUserPassword = async (userId, password) => {
    try {
      setIsLoading(true);
      await UserService.putSellersPasswordApi(userId, password);
      setIsChanged(true);
      return true;
    } catch (error) {
      console.error("Error al modificar el usuario: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { changedUserPassword, isChanged, isLoading };
};

export default usePutSellerPassword;
