import { useCallback, useEffect, useState } from "react";
import { CompaniesService } from "../../services/companies/companies.service.js";
import { SOFOCON_JWT_TOKEN } from "../../utils/Constants";
import axios from "axios";
const useCompanies = (props) => {
  const [companiesResponse, setCompaniesResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [modified, setModified] = useState(false);
  const [route, setRoutes] = useState(null);
  const [search, setSearch] = useState(null);
  const [nextVisit, setNextVisit] = useState(null);
  const [status, setStatus] = useState(null);
  const [list, setList] = useState(props?.id || null);
  const [user, setUser] = useState(null);
  const [neighborhood, setNeighborhood] = useState(null);
  const [department, setDepartment] = useState(null);
  const [searchStartDate, setSearchStartDate] = useState(null);
  const [searchEndDate, setSearchEndDate] = useState(null);

  const downloadFile = useCallback(async (url, fileName) => {
    try {
      setLoading(true);

      const response = await axios.get(url, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(SOFOCON_JWT_TOKEN)}`,
        },
      });

      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const urlObject = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = urlObject;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(urlObject);

      setLoading(false);
    } catch (error) {
      console.error("Error al descargar el archivo:", error);
    }
  }, []);
  //la funcion principal
  const getAllCompanies = useCallback(async () => {
    try {
      setLoading(true);
      //consumir el servicio
      const { data } = await CompaniesService.getAllCompaniesApi({
        page,
        itemsPerPage,
        route: props?.route || route || null,
        search,
        nextVisit,
        status,
        list,
        competence: props?.competence || null,
        user,
        neighborhood,
        department,
        searchStartDate,
        searchEndDate,
      });
      //aqui haces con el resultado lo que necesites

      setTotalPage(data.pagination.totalPages);
      setTotal(data.pagination.total);
      setCompaniesResponse(data.result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [
    page,
    itemsPerPage,
    props?.route,
    props?.competence,
    route,
    search,
    nextVisit,
    status,
    list,
    user,
    neighborhood,
    department,
    searchStartDate,
    searchEndDate,
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
    status,
    setModified,
    modified,
    setRoutes,
    setSearch,
    setNeighborhood,
    setNextVisit,
    setStatus,
    setList,
    downloadFile,
    setUser,
    setDepartment,
    user,
    setSearchStartDate,
    setSearchEndDate,
    searchStartDate,
    searchEndDate,
    getAllCompanies,
  };
};

export default useCompanies;
