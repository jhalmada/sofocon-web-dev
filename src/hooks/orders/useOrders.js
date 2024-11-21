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
  const [status, setStatus] = useState(null);
  const [entryDate, setEntryDate] = useState(null);
  const [orderType, setOrderType] = useState({
    isPreOrder: false,
    isDirect: false,
  });
  const [recharge, setRecharge] = useState(false);
  const [inOrders, setInOrders] = useState(null);

  const getAllOrders = async () => {
    try {
      setOrdersResponse([]);
      setLoading(true);
      const { data } = await OrdersService.getAllOrdersApi({
        page,
        itemsPerPage,
        search,
        recharge,
        inOrders,
        ...orderType,
        status,
        entryDate,
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
  }, [
    page,
    itemsPerPage,
    modified,
    search,
    orderType,
    status,
    entryDate,
    recharge,
    inOrders,
  ]);

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
    setStatus,
    setOrderType,
    setRecharge,
    setInOrders,
    setEntryDate,
  };
};

export default useOrders;
