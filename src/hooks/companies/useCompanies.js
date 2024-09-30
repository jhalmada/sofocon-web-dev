import { useEffect, useState } from "react";
import { CompaniesService } from "../../services/companies/companies.service.js";
const useCompanies = () => {
  const [usersResponse, setUsersResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  const [modified, setModified] = useState(false);

  //la funcion principal
  const getAllCompanies = async () => {
    try {
      setLoading(true);
      //consumir el servicio
      const { data } = await CompaniesService.getAllCompaniesApi({
        page,
        itemsPerPage,
      });
      //aqui haces con el resultado lo que necesites
      setTotalPage(data.pagination.totalPages);
      setUsersResponse(data.result);
      console.log(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  //que permite actualizar las lista de empresa
  useEffect(() => {
    getAllCompanies();
  }, [page, itemsPerPage, modified]);
  return {
    usersResponse,
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
