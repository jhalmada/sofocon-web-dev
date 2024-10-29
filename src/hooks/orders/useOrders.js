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
  const [client, setClient] = useState(null);
  const [nextVisit, setNextVisit] = useState(null);
  const getAllOrders = async () => {
    try {
      setLoading(true);
      const { data } = await OrdersService.getAllOrdersApi({
        page,
        itemsPerPage,
        search,
        client,
        nextVisit,
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
  }, [page, itemsPerPage, modified, client, nextVisit, search]);
  return {
    ordersResponse,
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
    setNextVisit,
    client,
    setClient,
  };
};

export default useOrders;
