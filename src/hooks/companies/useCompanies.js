import { useEffect, useState } from "react";
import { CompaniesService } from "../../services/companies/companies.service.js";
const useCompanies = (id = null) => {
  const [companiesResponse, setCompaniesResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [modified, setModified] = useState(false);
  const [route, setRoutes] = useState(null);
  const [search, setSearch] = useState("");
  const [nextVisit, setNextVisit] = useState(null);
  const [status, setStatus] = useState(null);
  const [competence, setCompetence] = useState(false);
  const [list, setList] = useState(id);

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
        nextVisit,
        status,
        list,
        competence,
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
  }, [
    page,
    itemsPerPage,
    modified,
    route,
    search,
    nextVisit,
    status,
    competence,
    list,
  ]);
  return {
    companiesResponse,
    loading,
    setItemsPerPage,
    totalPage,
    total,
    setPage,
    page,
    itemsPerPage,
    search,
    nextVisit,
    competence,
    status,
    setModified,
    modified,
    setRoutes,
    setSearch,
    setNextVisit,
    setStatus,
    setCompetence,
    setList,
  };
};

export default useCompanies;
