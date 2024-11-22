import { useEffect, useState } from "react";
import { OrdersService } from "../../services/orders/orders.service";
const useGetUnitOrders = () => {
  const [orderUnitResponse, setOrderUnitResponse] = useState([]);
  const [order, setOrder] = useState([]);
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");

  const getAllUnitOrders = async () => {
    try {
      setLoading(true);
      const { data } = await OrdersService.getAllUnitOrdersApi({
        order,
        year,
        month,
        page,
        itemsPerPage,
        search,
      });
      setTotalPage(data.pagination.totalPages);
      setTotal(data.pagination.total);
      setOrderUnitResponse(data.result);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUnitOrders();
  }, [page, itemsPerPage, search, order, year, month]);
  return {
    orderUnitResponse,
    order,
    year,
    month,
    loading,
    setItemsPerPage,
    totalPage,
    total,
    setPage,
    page,
    itemsPerPage,
    setOrder,
    setYear,
    setMonth,
    setSearch,
  };
};

export default useGetUnitOrders;
