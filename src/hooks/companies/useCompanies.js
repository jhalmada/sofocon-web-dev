import { useEffect, useState } from "react";
import { CompaniesService } from "../../services/companies/companies.service.js";
const useCompanies = () => {
  const [companiesResponse, setCompaniesResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  const [modified, setModified] = useState(false);
  const getAllCompanies = async () => {
    try {
      setLoading(true);
      const { data } = await CompaniesService.getAllCompaniesApi({
        page,
        itemsPerPage,
      });
      setTotalPage(data.pagination.totalPages);
      setCompaniesResponse(data.result);
      console.log(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCompanies();
  }, [page, itemsPerPage, modified]);
  return {
    companiesResponse,
    loading,
    setItemsPerPage,
    totalPage,
    setPage,
    page,
    itemsPerPage,
    setModified,
    modified,
  };
};

export default useCompanies;
