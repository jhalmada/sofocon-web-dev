import { useCallback, useEffect, useState } from "react";
import { CompaniesService } from "../../services/companies/companies.service.js";
import { SOFOCON_JWT_TOKEN } from "../../utils/Constants";
import axios from "axios";
const useCompanies = (id = null) => {
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
  const [competence, setCompetence] = useState(false);
  const [list, setList] = useState(id);

  const downloadFile = useCallback(async (url, fileName) => {
    try {
      setLoading(true);
      console.log("Descargando archivo desde:", url);
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
    downloadFile,
  };
};

export default useCompanies;
