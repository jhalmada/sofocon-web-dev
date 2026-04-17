import { useCallback, useState } from "react";
import { OrdersService } from "../../services/orders/orders.service";
import { SOFOCON_JWT_TOKEN } from "../../utils/Constants";
import axios from "axios";

const useOrders = () => {
  const [ordersResponse, setOrdersResponse] = useState([]);
  const [ordersAmount, setOrdersAmount] = useState(0);
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
  const [year, setYear] = useState(null);
  const [month, setMonth] = useState(null);
  const [week, setWeek] = useState(null);
  const [user, setUser] = useState(null);
  const [isCharged, setIsCharged] = useState("");
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
    async ({
      isPreOrder,
      inBoard,
      isDirect,
      inOrders,
      recharge,
      itemsPerPage,
    }) => {
      try {
        //setOrdersResponse([]);
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
          isCharged,
        });
        setOrdersAmount(data.totalAmount);
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
      isCharged,
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
    ordersAmount,
    status,
    search,
    month,
    year,
    week,
    user,
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
    isCharged,
    setIsCharged,
    getAllOrders,
    downloadFile,
  };
};

export default useOrders;
