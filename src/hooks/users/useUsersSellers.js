import { useEffect, useState } from "react";
import { UserService } from "../../services/user/user.service.js";
const useUsersSellers = () => {
  const [userSellerResponse, setUsersSellerResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [totalPage, setTotalPage] = useState(0);
  const [modified, setModified] = useState(false);
  const [search, setSearch] = useState("");
  const getUsersSellers = async () => {
    try {
      setLoading(true);
      const { data } = await UserService.getUsersSellersApi({
        page,
        itemsPerPage,
        search,
      });
      setTotalPage(data.pagination.totalPages);
      setUsersSellerResponse(data);
      console.log(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsersSellers();
  }, [page, itemsPerPage, modified, search]);
  return {
    userSellerResponse,
    loading,
    setItemsPerPage,
    totalPage,
    setPage,
    page,
    itemsPerPage,
    setModified,
    modified,
    setSearch,
  };
};

export default useUsersSellers;
