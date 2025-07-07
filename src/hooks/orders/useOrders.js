import { useCallback, useState } from "react";
import { OrdersService } from "../../services/orders/orders.service";
import { SOFOCON_JWT_TOKEN } from "../../utils/Constants";
import axios from "axios";

const useOrders = () => {
  const [ordersResponse, setOrdersResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [modified, setModified] = useState(false);
  const [search, setSearch] = useState(null);
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

  const downloadFile = useCallback(async (url, fileName, rechargeValue) => {
    try {
      setLoading(true);
    
      const response = await axios.get(url, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(SOFOCON_JWT_TOKEN)}`,
        },
        params: rechargeValue ? { isRecharge: true } : {},
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
        console.error(e);
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
      downloadFile,
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
    status,
    search,
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
    downloadFile,
  };
};

export default useOrders;
