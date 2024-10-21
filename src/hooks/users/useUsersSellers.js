import { useEffect, useState } from "react";
import { UserService } from "../../services/user/user.service.js";
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
      setTotalPage(data.pagination.totalPages);
      setTotal(data.pagination.total);
      setUsersSellerResponse(data);
    } catch (e) {
      console.log(e);
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
    itemsPerPage,
    setModified,
    modified,
    setSearch,
    setRoute,
    setIsActive,
  };
};

export default useUsersSellers;
