import { useEffect, useState } from "react";
import { CompaniesService } from "../../services/companies/companies.service.js";
const useCompanies = () => {
  const [companiesResponse, setCompaniesResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  const [modified, setModified] = useState(false);
  const [route, setRoutes] = useState(null);
  const [search, setSearch] = useState("");

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
      });
      //aqui haces con el resultado lo que necesites
      console.log(data);
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
  }, [page, itemsPerPage, modified, route, search]);
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
    setRoutes,
    setSearch,
  };
};

export default useCompanies;
