import { useEffect, useState } from "react";
import { CompaniesService } from "../../services/companies/companies.service";

const useGetOneCompany = (id) => {
  const [isLoading, setIsLoading] = useState(false);
  const [companyResponse, setCompany] = useState([]);
  console.log(id);

  const getOneCompany = async () => {
    try {
      setIsLoading(true);
      const response = await CompaniesService.getOneCompanyApi(id);
      console.log(response);
      setCompany(response.data);
    } catch (error) {
      console.error("Error al buscar la compañia: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOneCompany();
  }, [id]);

  return { getOneCompany, isLoading, companyResponse };
};

export default useGetOneCompany;
