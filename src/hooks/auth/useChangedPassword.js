import { useState } from "react";
import { CompaniesService } from "../../services/companies/companies.service.js";
import { UserService } from "../../services/user/user.service.js";

const useChangedPassword = () => {
  const [isChanged, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const changedPassword = async (userData, token) => {
    try {
      setIsLoading(true);
      const response = await UserService.putUserApiPassword(userData, token);

      return response.status;
    } catch (error) {
      console.error("Error al cambiar la contraseña: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { changedPassword, isChanged, isLoading };
};

export default useChangedPassword;
