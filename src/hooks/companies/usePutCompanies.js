import { useState } from "react";
import { CompaniesService } from "../../services/companies/companies.service.js";

const usePutCompany = () => {
  const [isChanged, setIsChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const changedCompany = async (companyData, companyId, setModified) => {
    try {
      setIsLoading(true);
      await CompaniesService.putCompanyApi(companyData, companyId);
      setModified((prev) => !prev);
      return true;
    } catch (error) {
      console.error("Error al modificar el usuario: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { changedCompany, isChanged, isLoading };
};

export default usePutCompany;
