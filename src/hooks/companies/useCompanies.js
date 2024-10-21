import { useEffect, useState } from "react";
import { CompaniesService } from "../../services/companies/companies.service.js";
const useCompanies = () => {
  const [companiesResponse, setCompaniesResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [modified, setModified] = useState(false);
  const [route, setRoutes] = useState(null);
  const [search, setSearch] = useState("");
  const [nexVisit, setNextVisit] = useState(1);
  const [status, setStatus] = useState(null);

  //la funcion principal
  const getAllCompanies = async () => {
    try {
      setLoading(true);
      //consumir el servicio
      const { data } = await CompaniesService.getAllCompaniesApi({
        page,
        itemsPerPage,
        route,
        search,
        nexVisit,
        status,
      });
      //aqui haces con el resultado lo que necesites

      setTotalPage(data.pagination.totalPages);
      setTotal(data.pagination.total);
      setCompaniesResponse(data.result);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  //que permite actualizar las lista de empresa cada vez que se modifica el paginado, o se elimina una empresa
  useEffect(() => {
    getAllCompanies();
  }, [page, itemsPerPage, modified, route, search, nexVisit, status]);
  return {
    companiesResponse,
    loading,
    setItemsPerPage,
    totalPage,
    total,
    setPage,
    page,
    itemsPerPage,
    setModified,
    modified,
    setRoutes,
    setSearch,
    setNextVisit,
    setStatus,
  };
};

export default useCompanies;
