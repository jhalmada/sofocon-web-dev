import { useCallback, useState } from "react";
import { CompaniesService } from "../../services/companies/companies.service.js";

const useAddCompany = () => {
  const [loading, setLoading] = useState(false);

  const postAddCompany = useCallback(async (userData) => {
    try {
      setLoading(true);
      const { data } = await CompaniesService.postAddCompaniesApi(userData);
      return data;
    } catch (e) {
      console.log(e);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return { postAddCompany, loading };
};

export default useAddCompany;
