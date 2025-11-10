import { useState } from "react";
import { CompaniesService } from "../../services/companies/companies.service.js";

const useUserCompany = () => {
  const [isChanged, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const addUsersCompany = async (usersList, companyId, setModified) => {
    try {
      setIsLoading(true);
      await CompaniesService.putUsersCompanyApi(usersList, companyId);
      if (setModified) setModified((prev) => !prev);
      return true;
    } catch (error) {
      console.error("Error al agregar los usuarios: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { addUsersCompany, isChanged, isLoading };
};

export default useUserCompany;
