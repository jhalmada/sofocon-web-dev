import { useState } from "react";
import { CompaniesService } from "../../services/companies/companies.service";

const useDeleteCompanies = () => {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const deleteCompany = async (companieId, setModified) => {
    try {
      setIsLoading(true);
      await CompaniesService.deleteCompanyApi(companieId);
      setIsDeleted(true);
      setModified((prev) => !prev);
    } catch (error) {
      console.error("Error al eliminar la empresa: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteCompany, isDeleted, isLoading };
};

export default useDeleteCompanies;
