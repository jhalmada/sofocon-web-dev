import { useEffect, useState } from "react";
import { CompaniesService } from "../../services/companies/companies.service.js";
const useCompanies = () => {
  const [companiesResponse, setCompaniesResponse] = useState([]);
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
      setCompaniesResponse(data.result);
      console.log(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  //que permite actualizar las lista de empresa cada vez que se modifica el paginado, o se elimina una empresa
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
