import { useEffect, useState } from "react";
import { UserService } from "../../services/user/user.service.js";
const useUsers = () => {
  const [usersResponse, setUsersResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  const [modified, setModified] = useState(false);
  const getAllUsers = async () => {
    try {
      setLoading(true);
      const { data } = await UserService.getAllUsersApi({
        page,
        itemsPerPage,
      });
      setTotalPage(data.pagination.totalPages);
      setUsersResponse(data.result);
      console.log(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
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

export default useUsers;
