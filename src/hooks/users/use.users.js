import { useEffect, useState } from "react";
import { UserService } from "../../services/user/user.service.js";
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
    setModified,
    modified,
    setSearch,
    setIsActive,
    setRole,
  };
};

export default useUsers;
