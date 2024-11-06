import { useEffect, useState } from "react";
import { OrdersService } from "../../services/orders/orders.service";
const useOrders = () => {
  const [ordersResponse, setOrdersResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [modified, setModified] = useState(false);
  const [search, setSearch] = useState("");
  const [isPreOrder, setIsPreOrder] = useState(false);
  const [isDirect, setIsDirect] = useState(false);
  const [status, setStatus] = useState(null);

  const getAllOrders = async () => {
    try {
      setLoading(true);
      const { data } = await OrdersService.getAllOrdersApi({
        page,
        itemsPerPage,
        search,
        isPreOrder,
        isDirect,
        status,
      });
      setTotalPage(data.pagination.totalPages);
      setTotal(data.pagination.total);
      setOrdersResponse(data.result);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, [page, itemsPerPage, modified, search, isPreOrder, isDirect, status]);
  return {
    ordersResponse,
    loading,
    totalPage,
    total,
    page,
    itemsPerPage,
    modified,
    setPage,
    setModified,
    setItemsPerPage,
    setSearch,
    setIsDirect,
    setIsPreOrder,
    setStatus,
  };
};

export default useOrders;
