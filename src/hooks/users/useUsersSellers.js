import { useCallback, useEffect, useState } from "react";
import { UserService } from "../../services/user/user.service.js";
import { SOFOCON_JWT_TOKEN } from "../../utils/Constants";
import axios from "axios";
const useUsersSellers = () => {
  const [userSellerResponse, setUsersSellerResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [modified, setModified] = useState(false);
  const [search, setSearch] = useState("");
  const [route, setRoute] = useState(null);
  const [isActive, setIsActive] = useState(null);

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
  const getUsersSellers = async () => {
    try {
      setLoading(true);
      const { data } = await UserService.getUsersSellersApi({
        page,
        itemsPerPage,
        search,
        route,
        isActive,
      });
      if (data) {
        setTotalPage(data.pagination.totalPages);
        setTotal(data.pagination.total);
        setUsersSellerResponse(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsersSellers();
  }, [page, itemsPerPage, modified, search, route, isActive]);
  return {
    userSellerResponse,
    loading,
    setItemsPerPage,
    totalPage,
    total,
    setPage,
    page,
    search,
    isActive,
    itemsPerPage,
    setModified,
    modified,
    setSearch,
    setRoute,
    setIsActive,
    downloadFile,
  };
};

export default useUsersSellers;
