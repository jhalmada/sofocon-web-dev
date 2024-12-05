import { useCallback, useState } from "react";
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
  const [barCode, setBarCode] = useState(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(null);
  const [week, setWeek] = useState(null);
  const [user, setUser] = useState(null);
  const [inBoard, setInBoard] = useState(true);
  const [orderType, setOrderType] = useState({
    isPreOrder: false,
    isDirect: false,
  });

  const getAllOrders = useCallback(
    async ({ isPreOrder, isDirect, inOrders, recharge }) => {
      try {
        setOrdersResponse([]);
        setLoading(true);
        const { data } = await OrdersService.getAllOrdersApi({
          page,
          itemsPerPage,
          search,
          recharge,
          inOrders,
          isPreOrder,
          isDirect,
          status,
          entryDate,
          barCode,
          year,
          month,
          week,
          user,
          inBoard,
        });
        setTotalPage(data.pagination.totalPages);
        setTotal(data.pagination.total);
        setOrdersResponse(data.result);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    },
    [
      entryDate,
      itemsPerPage,
      page,
      search,
      status,
      barCode,
      year,
      month,
      week,
      user,
      modified,
      inBoard,
    ],
  );

  return {
    ordersResponse,
    loading,
    totalPage,
    total,
    page,
    itemsPerPage,
    modified,
    month,
    year,
    week,
    user,
    inBoard,
    setInBoard,
    setPage,
    setModified,
    setItemsPerPage,
    setSearch,
    setStatus,
    setOrderType,
    setEntryDate,
    setBarCode,
    setYear,
    setMonth,
    setWeek,
    setUser,
    getAllOrders,
  };
};

export default useOrders;
