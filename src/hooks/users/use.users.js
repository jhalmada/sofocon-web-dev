import { useCallback, useEffect, useState } from "react";
import { UserService } from "../../services/user/user.service.js";
import { SOFOCON_JWT_TOKEN } from "../../utils/Constants";
import axios from "axios";
const useUsers = () => {
  const [usersResponse, setUsersResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [modified, setModified] = useState(false);
  const [search, setSearch] = useState("");
  const [isActive, setIsActive] = useState(null);
  const [role, setRole] = useState(null);

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
  const getAllUsers = async () => {
    try {
      setLoading(true);
      const { data } = await UserService.getAllUsersApi({
        page,
        itemsPerPage,
        search,
        isActive,
        role,
      });
      setTotalPage(data.pagination.totalPages);
      setTotal(data.pagination.total);

      setUsersResponse(data.result);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [page, itemsPerPage, modified, search, isActive, role]);
  return {
    usersResponse,
    loading,
    setItemsPerPage,
    totalPage,
    total,
    setPage,
    page,
    itemsPerPage,
    search,
    role,
    setModified,
    modified,
    setSearch,
    setIsActive,
    setRole,
    downloadFile,
  };
};

export default useUsers;
